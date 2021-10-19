const axios = require('axios');

function loansService() {
  function getLoansById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://devel12.statsbiblioteket.dk/librarylending/v1/partnerLoans/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  return { getLoansById };
}

module.exports = loansService();