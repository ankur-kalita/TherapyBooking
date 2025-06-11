import { body } from 'express-validator';

export const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('role')
    .optional()
    .isIn(['client', 'therapist'])
    .withMessage('Role must be either client or therapist'),
  
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number')
];

export const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

export const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  
  body('avatar')
    .optional()
    .isURL()
    .withMessage('Avatar must be a valid URL')
];

export const therapistProfileValidation = [
  body('specializations')
    .isArray({ min: 1 })
    .withMessage('At least one specialization is required'),
  
  body('bio')
    .trim()
    .notEmpty()
    .withMessage('Bio is required')
    .isLength({ max: 1000 })
    .withMessage('Bio cannot be more than 1000 characters'),
  
  body('experience')
    .isInt({ min: 0 })
    .withMessage('Experience must be a non-negative number'),
  
  body('education')
    .isArray({ min: 1 })
    .withMessage('At least one education entry is required'),
  
  body('languages')
    .isArray({ min: 1 })
    .withMessage('At least one language is required'),
  
  body('sessionTypes')
    .isArray({ min: 1 })
    .withMessage('At least one session type is required'),
  
  body('sessionTypes.*')
    .isIn(['individual', 'couple', 'family', 'group'])
    .withMessage('Invalid session type'),
  
  body('hourlyRate')
    .isFloat({ min: 0 })
    .withMessage('Hourly rate must be a positive number'),
  
  body('availability')
    .isArray({ min: 1 })
    .withMessage('Availability schedule is required'),
  
  body('availability.*.day')
    .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    .withMessage('Invalid day'),
  
  body('availability.*.startTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Start time must be in HH:MM format'),
  
  body('availability.*.endTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('End time must be in HH:MM format')
];

export const sessionValidation = [
  body('therapistId')
    .isMongoId()
    .withMessage('Invalid therapist ID'),
  
  body('date')
    .isISO8601()
    .withMessage('Date must be in valid ISO format')
    .custom((value) => {
      const sessionDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (sessionDate < today) {
        throw new Error('Session date cannot be in the past');
      }
      return true;
    }),
  
  body('startTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Start time must be in HH:MM format'),
  
  body('endTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('End time must be in HH:MM format'),
  
  body('duration')
    .isInt({ min: 15, max: 480 })
    .withMessage('Duration must be between 15 and 480 minutes'),
  
  body('sessionType')
    .isIn(['individual', 'couple', 'family', 'group'])
    .withMessage('Invalid session type'),
  
  body('isOnline')
    .optional()
    .isBoolean()
    .withMessage('isOnline must be a boolean'),
  
  body('clientNotes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Client notes cannot be more than 1000 characters')
];

export const updateSessionValidation = [
  body('status')
    .optional()
    .isIn(['scheduled', 'completed', 'cancelled', 'no-show'])
    .withMessage('Invalid status'),
  
  body('therapistNotes')
    .optional()
    .isLength({ max: 2000 })
    .withMessage('Therapist notes cannot be more than 2000 characters'),
  
  body('clientNotes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Client notes cannot be more than 1000 characters'),
  
  body('meetingLink')
    .optional()
    .isURL()
    .withMessage('Meeting link must be a valid URL')
];
