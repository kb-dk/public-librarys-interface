const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
  console.log('in passportConfig');
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log('serializeUser:',user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log('deserializeUser:', user);
      done(null, user);
  });
};
