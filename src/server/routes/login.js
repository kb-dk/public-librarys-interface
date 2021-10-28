const express = require('express');
var passport = require('passport');
const router = express.Router();

router.post('/', express.urlencoded({ extended: false }), function (req, res, next) {
  passport.authenticate('local',
    function (err, user, info) {
    if (err) {
      return res.status(400).send('Problem with login').end();
    }
    if (!user) {
      req.session.messages = [info.message];
      return res.status(400).send(req.session.messages).end();
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).end();
      }
      return res.status(200).send(user.libraryName).end();
    });
  })(req, res, next);
});

module.exports = router;
