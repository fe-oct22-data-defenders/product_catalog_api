'use strict';
const { Phones } = require('../models');

const fs = require('fs/promises');
const path = require('path');

const directoryPath = path.join(path.dirname(__dirname), 'api');
const phones = [];

const readJsonFiles = async () => {

  // Read all files in the directory
  const files = await fs.readdir(directoryPath, (err) => {
    if (err) {
      console.log('Error reading directory: ' + err);
      return;
    }
  });
  
  // Loop through each file
  for (const file of files) {
    // Check if the file is a JSON file
    if (path.extname(file) === '.json') {
      // Load the JSON data from the file
      try {
        const jsonData = await fs.readFile(path.join(directoryPath, file), 'utf-8');
        const data = JSON.parse(jsonData)
          .map(eachData => Object.assign(eachData, { createdAt: new Date() }));

        phones.push(...data);
      } catch (e) {
        console.error(`Error parsing JSON file ${file}: ${e}`);
      }
    }
  }
};

const initPhones = async () => {
  await readJsonFiles();
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await initPhones();

    console.log(phones);

    await queryInterface.bulkInsert(Phones.tableName, phones, {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(Phones.tableName, null, {});
  }
};
