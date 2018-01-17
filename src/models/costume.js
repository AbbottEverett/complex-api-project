const shortId = require('shortid');
const fs = require('fs');
const path = require('path');
const jsonPath = path.join(__dirname, '..', '..', 'costume.json');

const costumes = [{
    id: '1',
    name: 'hat',
    price: 9.99,
    tags: [{ id: '1', name:'red' }]
}];

function getAllCostumes() {
  const file = JSON.parse(fs.readFileSync(jsonPath));
  return file;
}

function getOneCostume(id) {
  const file = JSON.parse(fs.readFileSync(jsonPath));
  let response = getItemById(id, file);
  let errors = [];

  if (!response) {
    errors.push('Please make sure id is inputted correctly.');
    response = { errors };
  }

  return response;
}

function createCostume(input) {
  const file = JSON.parse(fs.readFileSync(jsonPath));
  const errors = validateParams(input);
  let response;

  if (errors.length > 0) {
    response = { errors };
  } else {
    const costume = {
      id: shortId.generate(),
      name: input.name,
      price: input.price,
      description: input.description,
      tags: []
    };
    file.push(costume);
    const contentsAsJSON = JSON.stringify(file);
    fs.writeFileSync(jsonPath, contentsAsJSON);
    response = { costume };
  }

  return response;
}

function updateCostume(id, input) {
  const file = JSON.parse(fs.readFileSync(jsonPath));
  const data = getItemById(id, file);
  let errors = validateParams(input);
  let response;

  if (!data) {
    errors.push('Please make sure id is inputted correctly');
  }

  if (errors.length > 0) {
    response = { errors };
  } else {
    data.name = input.name;
    data.price = input.price;
    data.description = input.description;
    const contentsAsJSON = JSON.stringify(file);
    fs.writeFileSync(jsonPath, contentsAsJSON);
    response = { data };
  }

  return response;
}

function removeCostume(id) {
  const file = JSON.parse(fs.readFileSync(jsonPath));
  const data = getItemById(id, file);
  let errors = [];
  let response;

  if (!data) {
    errors.push('Please make sure id is inputted correctly');
    response = { errors };
  } else {
    const index = file.indexOf(data);
    response = { data }
    file.splice(index, 1);
    const contentsAsJSON = JSON.stringify(file);
    fs.writeFileSync(jsonPath, contentsAsJSON);
  }

  return response;
}

function getItemById(id, array) {
  return array.find(item => item.id === id);
}

function validateParams (input) {
  const errors = [];
  const type = {};
  for (let key in input) {
    type[key] = checkDataType(input[key]);
  }
  if (type.name !== 'string') errors.push('Please enter a valid name. Name must be a string');
  if (type.price !== 'number') {
    errors.push('Please enter a valid price. Price must be a number.');
  } else {
    if (parseFloat(input.price) < 0.01) {
      errors.push('Please enter a valid price. Price must be greater than $0.01.');
    }
  }
  if (input.description && type.description !== 'string') errors.push('Please ensure description is valid. Description must be a string.');
  return errors;
}

function checkDataType (str) {
  const data = parseInt(str);
  const boolCheck = ['true', 'false'];
  let result;

  if (Number.isNaN(data)) {
    boolCheck.forEach((bool) => {
      if (str === bool) {
        result = bool;
      }
    });
    if (!result) {
      result = 'string';
    }
  } else {
    result = 'number';
  }
  return result;
}

module.exports = { getAllCostumes, getOneCostume, createCostume, updateCostume, removeCostume, getItemById, checkDataType, costumes };
