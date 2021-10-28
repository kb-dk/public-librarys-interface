const passport = require('passport');
const {Strategy} = require('passport-local');
const loginService = require('../../services/loginService');


module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      (username, password, done) => {
        (async function validateUser() {
          try {
            const loginResponse = await loginService.logIn(username, password);
            if (loginResponse) {
              done(null, {username, password, 'libraryName':loginResponse.data});
            } else {
              done(null, false);
            }
          } catch (error) {
            done(error, false);
          }
        })();
      }
    )
  );
};
