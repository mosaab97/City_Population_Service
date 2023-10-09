const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const results = [];

const getDataFromCsv = async () => {
  if(results.length === 0) {

    const fileStream = await fs.createReadStream('city_populations.csv') // Replace 'input.csv' with your CSV file path
    
    return new Promise((resolve, reject) => {
      fileStream
        .pipe(csv())
        .on('data', (row) => {
          const data = {
            state: row.state.toLowerCase(),
            city: row.city.toLowerCase(),
            population: parseInt(row.population)
          }
          results.push(data);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
  return results
}

const writeDataToCsv = async (city, state, population) => {
  await getDataFromCsv();
  const index = results.findIndex((data) => data.city === city && data.state === state)
  let status = 200;
  if(index === -1) {
    results.push({city, state, population})
    status = 201
  } else {
    results[index].population = population
  }

  const csvWriter = createCsvWriter({
    path: 'city_populations.csv', // Replace 'output.csv' with your desired output file path
    header: [
      { id: 'city', title: 'city' },
      { id: 'state', title: 'state' },
      { id: 'population', title: 'population' },
    ],
  });

  await csvWriter.writeRecords(results).then(() => {
    console.log('CSV file has been written successfully');
  })
  .catch((error) => {
    status = 500
    console.error('Error writing CSV file:', error);
  });
  return status
}
module.exports = {
  getDataFromCsv,
  writeDataToCsv
}