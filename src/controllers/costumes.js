const express = require('express');
const model = require('../models/costume');

function getAll (req, res, next) {
  const data = model.getAllCostumes();
  res.status(200).json({ data });
}

function getOne (req, res, next) {
  const data = model.getOneCostume(req.params.id);
  if (data.errors) {
    return next({ status: 404, message: `Could not find costume at id: ${req.params.id}`, errors: data.errors });
  }
  res.status(200).json({ data });
}

function create (req, res, next) {
  const data = model.createCostume(req.body);

  if (data.errors) {
    return next({ status: 400, message: `Could not create new food`, errors: data.errors });
  }

  res.status(201).json({ data });
}

function update (req, res, next) {
  const data = model.updateCostume(req.params.id, req.body);
  if (data.errors) {
    return next({ status: 400, message: `Could not update costume at id: ${req.params.id}`, errors: data.errors });
  }
  res.status(200).json({ data });
}

function remove (req, res, next) {
  const data = model.removeCostume(req.params.id)
  if (data.errors) {
    return next({ status: 400, message: `Could not update costume at id: ${req.params.id}`, errors: data.errors });
  }
  res.status(200).json({ data });
}

module.exports = { getAll, getOne, create, update, remove };
