import { Response } from 'express';
import { Therapist } from '../models/Therapist';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';
import mongoose from 'mongoose';

export const createTherapistProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (req.user.role !== 'therapist') {
      return res.status(403).json({ error: 'Only therapists can create therapist profiles' });
    }

    // Check if therapist profile already exists
    const existingProfile = await Therapist.findOne({ userId: req.user._id });
    if (existingProfile) {
      return res.status(400).json({ error: 'Therapist profile already exists' });
    }

    const {
      specializations,
      bio,
      experience,
      education,
      certifications,
      languages,
      sessionTypes,
      hourlyRate,
      availability
    } = req.body;

    const therapist = new Therapist({
      userId: req.user._id,
      specializations,
      bio,
      experience,
      education,
      certifications,
      languages,
      sessionTypes,
      hourlyRate,
      availability
    });

    await therapist.save();
    await therapist.populate('userId', 'name email avatar');

    res.status(201).json({
      message: 'Therapist profile created successfully',
      therapist
    });
  } catch (error) {
    console.error('Create therapist profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTherapists = async (req: AuthRequest, res: Response) => {
  try {
    const { 
      specialization, 
      minRate, 
      maxRate, 
      sessionType, 
      language,
      page = 1, 
      limit = 10 
    } = req.query;

    const filters: any = { isVerified: true };

    if (specialization) {
      filters.specializations = { $in: [specialization] };
    }

    if (minRate || maxRate) {
      filters.hourlyRate = {};
      if (minRate) filters.hourlyRate.$gte = Number(minRate);
      if (maxRate) filters.hourlyRate.$lte = Number(maxRate);
    }

    if (sessionType) {
      filters.sessionTypes = { $in: [sessionType] };
    }

    if (language) {
      filters.languages = { $in: [language] };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const therapists = await Therapist.find(filters)
      .populate('userId', 'name email avatar')
      .sort({ rating: -1, totalSessions: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Therapist.countDocuments(filters);

    res.json({
      therapists,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  } catch (error) {
    console.error('Get therapists error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTherapistById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid therapist ID' });
    }

    const therapist = await Therapist.findById(id)
      .populate('userId', 'name email avatar phone');

    if (!therapist) {
      return res.status(404).json({ error: 'Therapist not found' });
    }

    res.json({ therapist });
  } catch (error) {
    console.error('Get therapist by ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTherapistProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const therapist = await Therapist.findOne({ userId: req.user._id });
    if (!therapist) {
      return res.status(404).json({ error: 'Therapist profile not found' });
    }

    const {
      specializations,
      bio,
      experience,
      education,
      certifications,
      languages,
      sessionTypes,
      hourlyRate,
      availability
    } = req.body;

    const updatedTherapist = await Therapist.findByIdAndUpdate(
      therapist._id,
      {
        specializations,
        bio,
        experience,
        education,
        certifications,
        languages,
        sessionTypes,
        hourlyRate,
        availability
      },
      { new: true, runValidators: true }
    ).populate('userId', 'name email avatar');

    res.json({
      message: 'Therapist profile updated successfully',
      therapist: updatedTherapist
    });
  } catch (error) {
    console.error('Update therapist profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMyTherapistProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const therapist = await Therapist.findOne({ userId: req.user._id })
      .populate('userId', 'name email avatar phone');

    if (!therapist) {
      return res.status(404).json({ error: 'Therapist profile not found' });
    }

    res.json({ therapist });
  } catch (error) {
    console.error('Get my therapist profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
