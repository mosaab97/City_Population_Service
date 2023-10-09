const express = require('express');
const { getPopulationByCityAndState, upsertPapulation } = require('../service/populations');
const { handleParams, handlePopulationValue } = require('../middleware/populations');

const router = express.Router();

router.get('/state/:state/city/:city', handleParams, async (req, res) => {
    const {state, city} = req;
    try {
        const results = await getPopulationByCityAndState(state, city);
        if (!results) {
          return res.status(400).json({ message: 'City not found' });
        }
      
        res.status(200).json({ population: results.population});
    } catch(e) {
        res.status(500).json({ message: `Server Error: ${e.message}` });
    }
});
  
router.put('/state/:state/city/:city', [handleParams, handlePopulationValue], async (req, res) => {
    const {state, city, population} = req;
    try {
        const response = await upsertPapulation(city, state, population);
        let errorMessage;
        if(response === 500) {
            errorMessage = 'file not saved'
        }
        res.status(response).send(errorMessage);
    } catch(e) {
        res.status(500).json({ message: `Server Error: ${e.message}`});
    }
});

  module.exports = router;