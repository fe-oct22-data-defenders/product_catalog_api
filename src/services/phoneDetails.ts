const { PhoneDetails, AccessoriesDetails, TabletDetails } = require('../../models');
import _ from 'lodash';
import { PhoneDetails as PhoneDetailsType } from '../types/PhoneDetails';

function normalize(phone: PhoneDetailsType) {
  const copyOfPhone = _.cloneDeep(phone);

  delete copyOfPhone.createdAt;
  return copyOfPhone;
}

function findById(phoneId: string) {
  const typeOfDevice = phoneId.split('-')[1];

  console.log(typeOfDevice);

  if (typeOfDevice === 'ipad') {
    return TabletDetails.findByPk(phoneId);
  } else if (typeOfDevice === 'iphone') {
    return PhoneDetails.findByPk(phoneId);
  }

  return AccessoriesDetails.findByPk(phoneId);
}

export const phoneDetailsServices = {
  normalize,
  findById
};