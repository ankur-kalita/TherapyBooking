import { Router } from 'express';
import {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  cancelSession
} from '../controllers/sessionController';
import { authenticate, authorize } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { sessionValidation, updateSessionValidation } from '../utils/validations';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('client'),
  sessionValidation,
  validateRequest,
  createSession
);

router.get('/', authenticate, getSessions);
router.get('/:id', authenticate, getSessionById);

router.put(
  '/:id',
  authenticate,
  updateSessionValidation,
  validateRequest,
  updateSession
);

router.patch('/:id/cancel', authenticate, cancelSession);

export = router;
