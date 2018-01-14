const express = require('express');
const router = express.Router({ mergeParams: true });
const ctrl = require('../controllers/tags');

router.get('/', ctrl.getAll);
router.get('/:tagId', ctrl.getOne);
router.post('/', ctrl.create);
router.put('/:tagId', ctrl.update);
router.delete('/:tagId', ctrl.remove); 

module.exports = router;
