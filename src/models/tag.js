const parent = require('./costume');
const shortId = require('shortid');

function getAllTags (parentId) {
  const parentData = parent.getItemById(parentId, parent.costumes);
  let errors = [];
  let response;

  if (!parentData) {
    errors.push('Please make sure costume id is inputted correctly.');
    response = { errors };
  } else {
    const tags = parentData.tags;
    response = { tags };
  }

  return response;
}

function getOneTag (parentId, tagId) {
  const parentData = parent.getItemById(parentId, parent.costumes);
  console.log(parentData)
  let data;
  let errors = [];
  let response;

  if (!parentData) {
    errors.push('Please make sure costume id is inputted correctly.');
  } else {
    const tagsArray = parentData.tags;
    data = parent.getItemById(tagId, tagsArray);
  }

  if (!data) {
    errors.push('Please make sure tag id is inputted correctly.');
  }

  if (errors.length > 0) {
    response = { errors };
  } else {
    response = { data };
  }
  return response;
}

function createTag (parentId, input) {
  const parentData = parent.getItemById(parentId, parent.costumes);
  let errors = validateParams(input);

  let response;

  if (!parentData) {
    errors.push('Please make sure costume id is inputted correctly.');
  }

  if (errors.length > 0) {
    response = { errors };
  } else {
    const tag = {
      id: shortId.generate(),
      name: input.name,
      color: input.color
    };
    parentData.tags.push(tag);
    response = { tag };
  }

  return response;
}

function validateParams (input) {
  const errors = [];
  const type = {};
  for (let key in input) {
    type[key] = parent.checkDataType(input[key]);
  }

  if (type.name !== 'string') {
    errors.push('Please enter a valid name. Name must be a string.');
  } else {
    if (input.name.length > 10) {
      errors.push('Please enter a valid name. Name cannot be longer than 10 characters.');
    }
  }

  if (input.color) {
    if (type.color !== 'string') {
      errors.push('Please ensure color is valid. Color must be a string.');
    }
    if (input.color.length !== 7 || input.color[0] !== '#') {
      errors.push('Please ensure color is valid. Color must be a valid hex code.');
    }
  }

  return errors;
}

module.exports = { getAllTags, getOneTag, createTag };
