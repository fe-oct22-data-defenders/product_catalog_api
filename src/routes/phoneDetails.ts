import express from 'express';
import { phoneDetailsControllers } from '../controllers/phoneDetails';

export const router = express.Router();

router.get('/:productId', phoneDetailsControllers.getOne);
