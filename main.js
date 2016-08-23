var tone = require('./response.js');
var $ = require('./jquery-1.12.4.js');
// import {scaleLinear} from "d3-scale";


//executes when the Document Object Model (DOM) is ready for JavaScript code
$( document ).ready(function() {
  var gmail = new Gmail();


  // cleans up api response
  var reportMaker = function(data, status, compose){
    var report = "";
    for (var item in data) {
         //console.log(data[item]);
      for (var subItem in data[item]) {
        var categories = data[item][subItem];
        for  (var i = 0; i < categories.length; i++) {
          var category = categories[i];
          // var categoryName = (category.category_name); // print
          // console.log(category.category_name); print
          report += category.category_name;
          for (var j = 0; j < category.tones.length; j++) {
            var tone = category.tones[j];
            //  var tones = (tone.tone_name); // print
            //  var scores = (tone.score); // print
            report += tone.tone_name; // print
            report += tone.score;  // print
            // console.log(tone.tone_name);
            // console.log(tone.score);
          }
        }
      }
    }

    // returns a string that is what we want the user to see
    // console.log(report);
    var email_content = compose.body();
    compose.body(email_content + report);
    // returns a single string built with concantenation that I want the user to see:
  };

  var create_handler_for = function(compose) { //create a function called click handler,
    // this function makes a function called click_handler
    var click_handler = function(event) {
      console.log(event);

      // var composeWindow = compose;
      // step 1: get the compose text body
      // looks for all the divs with a class AD
      // var email_id = gmail.get.compose_ids()[gmail.get.compose_ids().length - 1];
        // console.log(email_id);
      // var email_blob = gmail.get.email_data(email_id);
      // var email_content = email_blob.threads[email_id].content_plain; // this needs be sent to api
      // console.log(email_content);

      // console.log(email_content);


      // step 3: get/set the email body
      var email_content = compose.body();

      //step 2: send it to my app
      $.post("https://localhost:8080/analyze",
      // wrapped the reportMaker that takes data and status so that it could also pass through compose 
      { text: email_content }, function(data, status) { reportMaker(data, status, compose );
        }); // calling reportMaker




      // compose.body();
      // console.log(email_text);


    };
    return click_handler;
  };

  // step4: click function that removes analysis



  //Returns the html element (button) of the last composed email
  var make_button = function(compose, type) {
    // Make a custom click_handler function for the window
    // that is stored in the "compose" variable
    var handler = create_handler_for(compose);
    gmail.tools.add_compose_button(
    compose,'•', handler, 'test_this' ); // using the "class"
  };

  // when a new compose window opens, make a button on it
  gmail = new Gmail();
    gmail.observe.on(
      "compose", make_button
  );
    console.log( 'ready!' );
});
