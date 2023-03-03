'use strict';
const { Phones } = require('../models');

console.log(Phones);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      Phones.tableName,
      {
        id: {
          primaryKey: true,
          type: Sequelize.STRING,
        },
        category: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phoneId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        itemId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        fullPrice: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        screen: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        capacity: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        color: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ram: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        year: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        updatedAt: false,
      }
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable(Phones.tableName);
  },
};
