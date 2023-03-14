const { Phones, Tablets, Accessories } = require('../../models');
import { Phone as PhoneType } from '../types/Phone';
import { ProductType } from '../types/ProductType';
import { SortBy } from '../types/SortBy';

function normalize(phone: PhoneType) {
  const copyOfPhone = { ...phone };
  delete copyOfPhone.createdAt;
  return copyOfPhone;
}

async function getSomeNewest() {
  const loadedData: PhoneType[] = await Phones.findAll({
    order: [['year', 'DESC']],
    raw: true,
  });

  const result = loadedData.slice(0, 10).map(normalize);

  return {
    result,
    loadedData: loadedData.length,
  };
}

async function getSomeCheapest() {
  const loadedData: PhoneType[] = await Phones.findAll({
    order: ['price'],
    raw: true,
  });

  const result = loadedData
    .filter((phone) => phone.fullPrice - phone.price >= 95)
    .slice(0, 10)
    .map(normalize);

  return {
    result,
    loadedData: loadedData.length,
  };
}

async function getMany(
  page: number,
  perPage: number,
  sortBy: string,
  productType: string
) {
  let loadedData: PhoneType[];
  let table;

  if (productType === ProductType.Accessories) {
    table = Accessories;
  } else if (productType === ProductType.Tablets) {
    table = Tablets;
  } else {
    table = Phones;
  }

  switch (sortBy) {
  case SortBy.Alphabetically:
    loadedData = await table.findAll({
      order: ['name'],
      raw: true,
    });
    break;

  case SortBy.Cheapest:
    loadedData = await table.findAll({
      order: ['price'],
      raw: true,
    });
    break;

  default:
    loadedData = await table.findAll({
      order: [['year', 'DESC']],
      raw: true,
    });
    break;
  }

  const phonesToSkip = perPage * (page - 1);
  const result = loadedData
    .slice(phonesToSkip, phonesToSkip + perPage)
    .map(normalize);

  return {
    result,
    loadedData: loadedData.length,
  };
}

function findById(phoneId: string) {
  const typeOfDevice = phoneId.split('-')[1];

  if (typeOfDevice === 'ipad') {
    return Tablets.findOne({ where: { phoneId } });
  } else if (typeOfDevice === 'iphone') {
    return Phones.findOne({ where: { phoneId } });
  }

  return Accessories.findOne({ where: { phoneId } });
}

export const phonesServices = {
  normalize,
  getMany,
  findById,
  getSomeNewest,
  getSomeCheapest,
};
