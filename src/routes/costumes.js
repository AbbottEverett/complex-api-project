const express = require('express');
const router = express.Router();
const shortId = require('shortid');

const costumes = [];

router.get('/', (req, res, next) => {
  res.status(200).json({ data: costumes });
});

router.get('/:id', (req, res, next) => {

});

router.post('/', (req, res, next) => {
  const reqData = req.body;
  const errors = validateParams(reqData);
  let response;

  if (errors.length > 0) {
    return next({ status: 400, message: 'Could not create costume.', errors: errors });
  } else {
    const costume = {
      id: shortId.generate(),
      name: reqData.name,
      price: reqData.price,
      description: reqData.description,
      tags: []
    };
    costumes.push(costume);
    response = { costume };
  }

  res.status(201).json({ data: response });
});

router.put('/:id', (req, res, next) => {

});

router.delete('/:id', (req, res, next) => {

});

function validateParams (input) {
  const errors = [];
  const type = {};
  for (let key in input) {
    type[key] = checkDataType(input[key]);
  }
  if (type.name !== 'string') errors.push('Please enter a valid name. Name must be a string');
  if (type.price !== 'number') errors.push('Please enter a valid price. Price must be a number.');
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

module.exports = router;
