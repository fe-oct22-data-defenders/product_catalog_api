const { Phones } = require('../../models');
import { Phone as PhoneType } from '../types/Phone';

function normalize(phone: PhoneType) {
  const copyOfPhone = { ...phone };
  delete copyOfPhone.createdAt;
  return copyOfPhone;
}

function getAll() {
  return Phones.findAll({
    order: ['createdAt'],
    raw: true
  });
}

function findById(phoneId: string) {
  return Phones.findByPk(phoneId);
}

export const phonesServices = {
  normalize,
  getAll,
  findById
};