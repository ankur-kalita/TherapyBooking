import { Response } from 'express';
import { Session } from '../models/Session';
import { Therapist } from '../models/Therapist';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';
import mongoose from 'mongoose';

export const createSession = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const {
      therapistId,
      date,
      startTime,
      endTime,
      duration,
      sessionType,
      isOnline,
      clientNotes
    } = req.body;

    // Validate therapist exists
    const therapist = await Therapist.findById(therapistId);
    if (!therapist) {
      return res.status(404).json({ error: 'Therapist not found' });
    }

    // Check for scheduling conflicts
    const sessionDate = new Date(date);
    const existingSession = await Session.findOne({
      therapistId,
      date: sessionDate,
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ],
      status: { $ne: 'cancelled' }
    });

    if (existingSession) {
      return res.status(400).json({ error: 'Time slot is already booked' });
    }

    // Calculate cost
    const cost = (duration / 60) * therapist.hourlyRate;

    const session = new Session({
      clientId: req.user._id,
      therapistId,
      date: sessionDate,
      startTime,
      endTime,
      duration,
      sessionType,
      cost,
      isOnline,
      clientNotes
    });

    await session.save();
    await session.populate([
      { path: 'clientId', select: 'name email' },
      { path: 'therapistId', populate: { path: 'userId', select: 'name email' } }
    ]);

    // Update therapist's total sessions
    await Therapist.findByIdAndUpdate(therapistId, {
      $inc: { totalSessions: 1 }
    });

    res.status(201).json({
      message: 'Session booked successfully',
      session
    });
  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSessions = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { status, date, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    let filter: any = {};

    // Filter by user role
    if (req.user.role === 'client') {
      filter.clientId = req.user._id;
    } else if (req.user.role === 'therapist') {
      const therapist = await Therapist.findOne({ userId: req.user._id });
      if (!therapist) {
        return res.status(404).json({ error: 'Therapist profile not found' });
      }
      filter.therapistId = therapist._id;
    }

    // Apply additional filters
    if (status) {
      filter.status = status;
    }

    if (date) {
      const sessionDate = new Date(date as string);
      filter.date = {
        $gte: sessionDate,
        $lt: new Date(sessionDate.getTime() + 24 * 60 * 60 * 1000)
      };
    }

    const sessions = await Session.find(filter)
      .populate('clientId', 'name email avatar')
      .populate({
        path: 'therapistId',
        populate: { path: 'userId', select: 'name email avatar' }
      })
      .sort({ date: -1, startTime: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Session.countDocuments(filter);

    res.json({
      sessions,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSessionById = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid session ID' });
    }

    const session = await Session.findById(id)
      .populate('clientId', 'name email avatar')
      .populate({
        path: 'therapistId',
        populate: { path: 'userId', select: 'name email avatar' }
      });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Check if user has access to this session
    const hasAccess = 
      session.clientId._id.toString() === req.user._id.toString() ||
      (req.user.role === 'therapist' && (session.therapistId as any).userId._id.toString() === req.user._id.toString());

    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ session });
  } catch (error) {
    console.error('Get session by ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSession = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { id } = req.params;
    const { status, therapistNotes, clientNotes, meetingLink } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid session ID' });
    }

    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Check permissions
    const isClient = session.clientId.toString() === req.user._id.toString();
    const isTherapist = req.user.role === 'therapist';

    if (!isClient && !isTherapist) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Update fields based on user role
    const updateData: any = {};

    if (status && (isTherapist || isClient)) {
      updateData.status = status;
    }

    if (therapistNotes && isTherapist) {
      updateData.therapistNotes = therapistNotes;
    }

    if (clientNotes && isClient) {
      updateData.clientNotes = clientNotes;
    }

    if (meetingLink && isTherapist) {
      updateData.meetingLink = meetingLink;
    }

    const updatedSession = await Session.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate([
      { path: 'clientId', select: 'name email avatar' },
      { path: 'therapistId', populate: { path: 'userId', select: 'name email avatar' } }
    ]);

    res.json({
      message: 'Session updated successfully',
      session: updatedSession
    });
  } catch (error) {
    console.error('Update session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const cancelSession = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid session ID' });
    }

    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Check if user can cancel this session
    const isClient = session.clientId.toString() === req.user._id.toString();
    const isTherapist = req.user.role === 'therapist';

    if (!isClient && !isTherapist) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Check if session can be cancelled (e.g., not already completed)
    if (session.status === 'completed') {
      return res.status(400).json({ error: 'Cannot cancel a completed session' });
    }

    if (session.status === 'cancelled') {
      return res.status(400).json({ error: 'Session is already cancelled' });
    }

    const updatedSession = await Session.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    ).populate([
      { path: 'clientId', select: 'name email avatar' },
      { path: 'therapistId', populate: { path: 'userId', select: 'name email avatar' } }
    ]);

    res.json({
      message: 'Session cancelled successfully',
      session: updatedSession
    });
  } catch (error) {
    console.error('Cancel session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
