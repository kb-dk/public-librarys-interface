const express = require('express');
const loansService = require('../services/loansService');
const router = express.Router();

/* retrieves a partner's loans by partnerId */
router.get('/:id', async (req, res) => {
  // if (loggedIn) {
    try {
      const loansResponse = await loansService.getLoansById(req.params.id);
      return res.send(loansResponse.data);
    } catch (err) {
      return next(err);
    }
  // }
});

module.exports = router;
