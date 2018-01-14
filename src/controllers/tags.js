const express = require('express');
const model = require('../models/tag');

function getAll (req, res, next) {
  const data = model.getAllTags(req.params.id);
  if (data.errors) {
    return next({ status: 404, message: `Could not find costume at id: ${req.params.id}`, errors: data.errors });
  }
  res.status(200).json({ data });
}

function getOne (req, res, next) {
  const data = model.getOneTag(req.params.id, req.params.tagId);
  if (data.errors) {
    return next({ status: 404, message: `Could not find tag at id: ${req.params.tagId}`, errors: data.errors });
  }
  res.status(200).json({ data });
}

function create (req, res, next) {
  const data = model.createTag(req.params.id, req.body);

  if (data.errors) {
    return next({ status: 400, message: `Could not create new tag.`, errors: data.errors });
  }

  res.status(201).json({ data });
}

function update (req, res, next) {
  res.status(200).json({ data: `my nested path works! costumeId: ${req.params.id} tagId:${req.params.tagId}` });
}

function remove (req, res, next) {
  res.status(200).json({ data: `my nested path works! costumeId: ${req.params.id} tagId:${req.params.tagId}` });
}

module.exports = { getAll, getOne, create, update, remove };
