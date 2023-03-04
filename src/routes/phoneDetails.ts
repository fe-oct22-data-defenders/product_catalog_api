import express from 'express';
import { phoneDetailsControllers } from '../controllers/phoneDetails';

export const router = express.Router();

router.get('/:phoneId', phoneDetailsControllers.getOne);
