import mongoose, { Document, Schema } from 'mongoose';

export interface ISession extends Document {
  _id: string;
  clientId: mongoose.Types.ObjectId;
  therapistId: mongoose.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  sessionType: 'individual' | 'couple' | 'family' | 'group';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  clientNotes?: string;
  therapistNotes?: string;
  cost: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  meetingLink?: string;
  isOnline: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<ISession>({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  therapistId: {
    type: Schema.Types.ObjectId,
    ref: 'Therapist',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: [15, 'Session duration must be at least 15 minutes']
  },
  sessionType: {
    type: String,
    enum: ['individual', 'couple', 'family', 'group'],
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  notes: {
    type: String,
    maxlength: [2000, 'Notes cannot be more than 2000 characters']
  },
  clientNotes: {
    type: String,
    maxlength: [1000, 'Client notes cannot be more than 1000 characters']
  },
  therapistNotes: {
    type: String,
    maxlength: [2000, 'Therapist notes cannot be more than 2000 characters']
  },
  cost: {
    type: Number,
    required: true,
    min: [0, 'Cost cannot be negative']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  meetingLink: {
    type: String
  },
  isOnline: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient queries
sessionSchema.index({ clientId: 1, date: -1 });
sessionSchema.index({ therapistId: 1, date: -1 });
sessionSchema.index({ date: 1, status: 1 });

export const Session = mongoose.model<ISession>('Session', sessionSchema);
