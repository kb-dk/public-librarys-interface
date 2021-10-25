const express = require('express');
const loginService = require('../services/loginService');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const loginResponse = await loginService.logIn(req.body.id, req.body.pass);
    return res.send(loginResponse.data);
  } catch (err) {
    console.log('Login rejected:', err);
    return next(err);
  }
});

module.exports = router;
