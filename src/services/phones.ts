const { Phones } = require('../../models');
import { Phone as PhoneType } from '../types/Phone';
import { SortBy } from '../types/SortBy';

function normalize(phone: PhoneType) {
  const copyOfPhone = { ...phone };
  delete copyOfPhone.createdAt;
  return copyOfPhone;
}

async function getMany(
  page: number,
  perPage: number,
  sortBy: string,
) {
  let loadedData: PhoneType[];

  switch(sortBy) {
  case SortBy.Alphabetically:
    loadedData = await Phones.findAll({
      order: ['name'],
      raw: true,
    });
    break;

  case SortBy.Cheapest:
    loadedData = await Phones.findAll({
      order: ['price'],
      raw: true,
    });
    break;

  default:
    loadedData = await Phones.findAll({
      order: [['year', 'DESC']],
      raw: true,
    });
    break;
  }

  const phonesToSkip = perPage * (page - 1);
  const result = loadedData
    .slice(phonesToSkip, phonesToSkip + perPage)
    .map(normalize);

  return result;
}

function findById(phoneId: string) {
  return Phones.findByPk(phoneId);
}

export const phonesServices = {
  normalize,
  getMany,
  findById,
};
