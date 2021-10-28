const express = require('express');
const loansService = require('../services/loansService');
const router = express.Router();

/* retrieves a partner's loans by partnerId */
router.get('/:id', ensureAuthenticated, express.urlencoded({ extended: false }),  async (req, res) => {
    try {
      const loansResponse = await loansService.getLoansById(req.params.id);
      return res.status(200).send(loansResponse.data).end();
    } catch (err) {
      return res.status(400).send(err).end();
    }
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.params.id === req.user.username) {
    return next();
  }
  return res.status(400).send('Not logged in').end();
}

module.exports = router;
