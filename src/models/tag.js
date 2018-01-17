const parent = require('./costume');
const shortId = require('shortid');
const fs = require('fs');
const path = require('path');
const jsonPath = path.join(__dirname, '..', '..', 'costume.json');

function getAllTags (parentId) {
  const file = JSON.parse(fs.readFileSync(jsonPath));
  const parentData = getItemById(parentId, file);
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
  const file = JSON.parse(fs.readFileSync(jsonPath));
  const parentData = getItemById(parentId, file);
  let errors = [];
  let response;

  if (!parentData) {
    errors.push('Please make sure costume id is inputted correctly.');
  } else {
    const tagsArray = parentData.tags;
    response = getItemById(tagId, tagsArray);
  }

  if (!response) {
    errors.push('Please make sure tag id is inputted correctly.');
  }

  if (errors.length > 0) {
    response = { errors };
  }

  return response;
}

function createTag (parentId, input) {
  const file = JSON.parse(fs.readFileSync(jsonPath));
  const parentData = getItemById(parentId, file);
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
    const contentsAsJSON = JSON.stringify(file);
    fs.writeFileSync(jsonPath, contentsAsJSON);
    response = { tag };
  }

  return response;
}

function updateTag (parentId, tagId, input) {
  const file = JSON.parse(fs.readFileSync(jsonPath));
  const parentData = getItemById(parentId, file);
  const tagsArray = parentData.tags;
  const tag = getItemById(tagId, tagsArray);
  let errors = validateParams(input);
  let response;

  if (tag.errors) {
    errors = errors.concat(tag.errors);
  }

  if (errors.length > 0) {
    response = { errors };
  } else {
    tag.name = input.name;
    tag.color = input.color;
    response = { tag };
    const contentsAsJSON = JSON.stringify(file);
    fs.writeFileSync(jsonPath, contentsAsJSON);
  }

  return response;
}

function removeTag (parentId, tagId) {
  const file = JSON.parse(fs.readFileSync(jsonPath));
  const parentData = getItemById(parentId, file);
  const tag = getOneTag(parentId, tagId);
  let index;
  let response;

  if (tag.errors) {
    response = tag.errors;
  } else {
    index = parentData.tags.indexOf(tag);
    response = { tag };
    parentData.tags.splice(index, 1);
    const contentsAsJSON = JSON.stringify(file);
    fs.writeFileSync(jsonPath, contentsAsJSON);
  }

  return response;
}

function validateParams (input) {
  const errors = [];
  const type = {};
  for (let key in input) {
    type[key] = checkDataType(input[key]);
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

function getItemById(id, array) {
  return array.find(item => item.id === id);
}

module.exports = { getAllTags, getOneTag, createTag, removeTag, updateTag };
