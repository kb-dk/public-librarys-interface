const axios = require('axios');

function loginService() {
  function logIn(id, pass) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://devel12.statsbiblioteket.dk/librarylending/v1/checkCreds?libraryNumber=${id}&postcode=${pass}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  return {logIn};
}

module.exports = loginService();
