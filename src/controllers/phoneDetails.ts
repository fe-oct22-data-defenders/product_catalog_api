import { Request, Response } from 'express';
import { phoneDetailsServices } from '../services/phoneDetails';

const getOne = async (req: Request, res: Response) => {
  const { phoneId } = req.params;
  try {
    const findPhoneById = await phoneDetailsServices.findById(phoneId);

    if (!findPhoneById) {
      res.sendStatus(404);

      return;
    }

    res.send(
      phoneDetailsServices.normalize(findPhoneById.get({ plain: true })),
    );

    return findPhoneById;
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const phoneDetailsControllers = {
  getOne,
};
