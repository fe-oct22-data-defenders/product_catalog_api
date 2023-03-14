'use strict';
const { AccessoriesDetails } = require('../models');

const fs = require('fs/promises');
const path = require('path');

const directoryPath = path.join(
  path.dirname(__dirname),
  'api/accessories/additionData'
);
const accessoriesArray = [];

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
        const jsonData = await fs.readFile(
          path.join(directoryPath, file),
          'utf-8'
        );
        const data = JSON.parse(jsonData).map((eachData) => {
          eachData.description = JSON.stringify(eachData.description);
          return Object.assign(eachData, { createdAt: new Date() });
        });

        data.description = JSON.stringify(data.description);

        accessoriesArray.push(...data);
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
  async up(queryInterface) {
    await initPhones();

    console.log(accessoriesArray[0]);

    await queryInterface.bulkInsert(
      AccessoriesDetails.tableName,
      accessoriesArray,
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(AccessoriesDetails.tableName, null, {});
  },
};
