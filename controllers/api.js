"use strict";
let request = require('request');
var send_request = "localhost:8080/v1/analyze";

// this is connected to the routes in index.js
module.exports = {
  getmyApp: function(queryOptions, callback) {
    // error, results
    let requestOptions = {
      method: 'GET',
      url: send_request, // order, limit and offset query param
      headers: {
        'Accept': 'application/json',
        'X-App-Token': apiToken
      }
    };
    request(requestOptions, callback); // callback is a local vairable that comes from the routes
      // this is where we actually have the songs passed through
  }
};
