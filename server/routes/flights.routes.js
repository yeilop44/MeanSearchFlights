const express = require('express');
const router = express.Router();

const fliCtrl = require('../controllers/flights.controller');


router.get('/', fliCtrl.getFlights);
router.get('/:id', fliCtrl.getFlight);
router.post('/', fliCtrl.createFlights);
router.put('/:id', fliCtrl.editFlight);
router.delete('/:id', fliCtrl.deleteFlight);

module.exports = router;

