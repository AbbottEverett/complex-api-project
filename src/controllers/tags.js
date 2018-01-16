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
  const data = model.updateTag(req.params.id, req.params.tagId, req.body);

  if (data.errors) {
    return next({ status: 400, message: `Could not update tag at id: ${req.params.tagId}`, errors: data.errors });
  }

  res.status(200).json({ data });
}

function remove (req, res, next) {
  const data = model.removeTag(req.params.id, req.params.tagId);

  if (data.errors) {
    return next({ status: 404, message: `Could not remove tag at id: ${req.params.tagId}`, errors: data.errors });
  }

  res.status(200).json({ data });
}

module.exports = { getAll, getOne, create, update, remove };
