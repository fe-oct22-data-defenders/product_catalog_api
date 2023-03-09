import express from 'express';
import { phonesControllers } from '../controllers/phones';

export const router = express.Router();

router.get('/', phonesControllers.getMany);
router.get('/new', phonesControllers.getNew);
router.get('/discount', phonesControllers.getDiscount);
