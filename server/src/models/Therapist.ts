import mongoose, { Document, Schema } from 'mongoose';

export interface ITherapist extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  specializations: string[];
  bio: string;
  experience: number;
  education: string[];
  certifications: string[];
  languages: string[];
  sessionTypes: ('individual' | 'couple' | 'family' | 'group')[];
  hourlyRate: number;
  availability: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  rating: number;
  totalSessions: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const therapistSchema = new Schema<ITherapist>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  specializations: [{
    type: String,
    required: true
  }],
  bio: {
    type: String,
    required: true,
    maxlength: [1000, 'Bio cannot be more than 1000 characters']
  },
  experience: {
    type: Number,
    required: true,
    min: [0, 'Experience cannot be negative']
  },
  education: [{
    type: String,
    required: true
  }],
  certifications: [{
    type: String
  }],
  languages: [{
    type: String,
    required: true
  }],
  sessionTypes: [{
    type: String,
    enum: ['individual', 'couple', 'family', 'group'],
    required: true
  }],
  hourlyRate: {
    type: Number,
    required: true,
    min: [0, 'Hourly rate cannot be negative']
  },
  availability: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalSessions: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const Therapist = mongoose.model<ITherapist>('Therapist', therapistSchema);
