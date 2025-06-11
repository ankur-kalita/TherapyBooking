import { Router } from 'express';
import {
  createTherapistProfile,
  getTherapists,
  getTherapistById,
  updateTherapistProfile,
  getMyTherapistProfile
} from '../controllers/therapistController';
import { authenticate, authorize } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { therapistProfileValidation } from '../utils/validations';

const router = Router();

router.post(
  '/profile',
  authenticate,
  authorize('therapist'),
  therapistProfileValidation,
  validateRequest,
  createTherapistProfile
);

router.get('/', getTherapists);
router.get('/my-profile', authenticate, authorize('therapist'), getMyTherapistProfile);
router.get('/:id', getTherapistById);

router.put(
  '/profile',
  authenticate,
  authorize('therapist'),
  therapistProfileValidation,
  validateRequest,
  updateTherapistProfile
);

export = router;
