import { Request, Response } from 'express';
import { phoneDetailsServices } from '../services/phoneDetails';
import { phonesServices } from '../services/phones';

const getOne = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const findPhoneById = await phoneDetailsServices.findById(productId);
    const findPhoneByIdShort = await phonesServices.findById(productId);

    if (!findPhoneById) {
      res.sendStatus(404);

      return;
    }

    res.send(
      {
        longData: phoneDetailsServices.normalize(findPhoneById.get({ plain: true })),
        shortData: phonesServices.normalize(findPhoneByIdShort.get({ plain: true })),
      }
    );

    return findPhoneById;
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const phoneDetailsControllers = {
  getOne,
};
