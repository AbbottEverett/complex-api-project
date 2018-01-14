const shortId = require('shortid');
const costumes = [];

function getAllCostumes() {
  return costumes;
}

function getOneCostume(id) {
  let response = getItemById(id, costumes);
  let errors = [];

  if (!response) {
    errors.push('Please make sure id is inputted correctly');
    response = { errors };
  }

  return response;
}

function createCostume(input) {
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
    costumes.push(costume);
    response = { costume };
  }

  return response;
}

function updateCostume(id, input) {
  const data =  getItemById(id, costumes);
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
    response = { data };
  }

  return response;
}

function removeCostume(id) {
  const data = getItemById(id, costumes);
  const index = costumes.indexOf(data);
  let errors = [];
  let response;

  if (!data) {
    errors.push('Please make sure id is inputted correctly');
    response = { errors };
  } else {
    response = { data }
    costumes.splice(index, 1);
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

module.exports = { getAllCostumes, getOneCostume, createCostume, updateCostume, removeCostume };
