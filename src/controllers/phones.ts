import { Request, Response } from 'express';
import { phonesServices } from '../services/phones';

const getAll = async (req: Request, res: Response) => {
  const loadPhones = await phonesServices.getAll();

  res.send(loadPhones.map(phonesServices.normalize));
};

const getOne = async (req: Request, res: Response) => {
  const { phoneId } = req.params;
  try {
    const findPhoneById = await phonesServices.findById(phoneId);

    if (!findPhoneById) {
      res.sendStatus(404);

      return;
    }

    res.send(
      phonesServices.normalize(findPhoneById.get({ plain: true })),
    );

    return findPhoneById;
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const phonesControllers = {
  getAll, 
  getOne,
};
