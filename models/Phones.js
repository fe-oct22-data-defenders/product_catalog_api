'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(/*models*/) {
      // define association here
    }
  }
  Phones.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      category: DataTypes.STRING,
      phoneId: DataTypes.STRING,
      itemId: DataTypes.STRING,
      name: DataTypes.STRING,
      fullPrice: DataTypes.FLOAT,
      price: DataTypes.FLOAT,
      screen: DataTypes.STRING,
      capacity: DataTypes.STRING,
      color: DataTypes.STRING,
      ram: DataTypes.STRING,
      year: DataTypes.FLOAT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Phones',
      createdAt: true,
      updatedAt: false,
    }
  );
  return Phones;
};