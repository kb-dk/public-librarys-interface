const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('req.session:',req.session);
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.statusMessage = "Unable to logout";
        return res.status(400).end();
      } else {
        res.statusMessage = "Logged out successfully";
        return res.status(200).end();
      }
    });
    console.log('req.session:',req.session);
  } else {
    return res.end();
  }
});

module.exports = router;
