var tone = require('./response.js');
var $ = require('./jquery-1.12.4.js');
// import {scaleLinear} from "d3-scale";


//Executes when the Document Object Model (DOM) is ready for JavaScript code
$( document ).ready(function() {
  var gmail = new Gmail();


  // Cleans up api response
  var reportMaker = function(data, status, compose){
    var report = "";
    for (var item in data) {
      for (var subItem in data[item]) {
        var categories = data[item][subItem];
        for  (var i = 0; i < categories.length; i++) {
          var category = categories[i];
          report += category.category_name; // print
          for (var j = 0; j < category.tones.length; j++) {
            var tone = category.tones[j];
            report += tone.tone_name; // print
            report += tone.score;  // print
          }
        }
      }
    }

    // Assigning the body of the email to a variable that can be used within scope
    var email_content = compose.body();
    // Returns a string that is what we want the user to see
    // Step 3: Get/set the email body
    compose.body(email_content + report);
  };


  // Creates a function called click handler,
  var create_handler_for = function(compose) {
    var click_handler = function(event) {
      // step 1: get the compose text body
      var email_content = compose.body();
      // Step 2: Send it to my app
      $.post("https://localhost:8080/analyze",
      // wrapped the reportMaker that takes data and status so that it could also pass through compose
      { text: email_content }, function(data, status) { reportMaker(data, status, compose );
      }); // calling reportMaker function
    };
    return click_handler;
  };

  
  // Step 4: Click function that removes analysis


  // Returns the html element (button) of the last composed email
  var make_button = function(compose, type) {
    // Make a custom click_handler function for the window that is stored in the "compose" variable
    var handler = create_handler_for(compose);
    gmail.tools.add_compose_button(
    compose,'Tonalyze', handler, 'test_this' );
  };


  // Makes a button when a new compose window opens
  gmail = new Gmail();
    gmail.observe.on(
      "compose", make_button
  );
    console.log( 'ready!' );
});
