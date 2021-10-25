const express = require('express');
const loginService = require('../services/loginService');
const router = express.Router();

/* retrieves a partner's loans by partnerId */
// router.get('/', (req, res) => {
//   console.log(req.body);
//   res.json(req.body);
//   try {
//     const loginResponse = await loginService.logIn(req.params.id, req.params.pass);
//     return res.send(loginResponse.data);
//   } catch (err) {
//     return next(err);
//   }
// });

// router.get('/:id/:pass', async (req, res) => {
//     try {
//       const loginResponse = await loginService.logIn(req.params.id, req.params.pass);
//       return res.send(loginResponse.data);
//     } catch (err) {
//       return next(err);
//     }
// });

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
