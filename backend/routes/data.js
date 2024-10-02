const express = require('express');
const router = express.Router();
const { createData, getData, getDataById, getDataByType, updateData, deleteData} = require("../controllers/data/dataController");
const {authenticate} = require("../middlewares/auth");

// Route to create a new data entry
router.post('/', authenticate, createData);

// Route to get all data entries for the user
router.get('/', authenticate, getData);

// Route to get a specific data entry by ID
router.get('/:id', authenticate, getDataById);

// Route to get all data of a specific type for the user
router.get('/type/:type', authenticate, getDataByType);

// Route to update a data entry
router.put('/:id', authenticate, updateData);

// Route to delete a data entry
router.delete('/:id', authenticate, deleteData);

module.exports = router;
