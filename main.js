var tone = require('./response.js');
var $ = require('./jquery-1.12.4.js');
// import {scaleLinear} from "d3-scale";


//executes when the Document Object Model (DOM) is ready for JavaScript code
$( document ).ready(function() {
  var gmail = new Gmail();


  // cleans up api response
  var reportMaker = function(data, status){
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
    // returns a single string built with concantenation that I want the user to see:
    return report;
  };

  var click_handler = function(event) {
    console.log(event);

    // step 1: get the compose text body
    var email_id = gmail.get.compose_ids()[gmail.get.compose_ids().length - 1];
    console.log(email_id);
    var email_blob = gmail.get.email_data(email_id);
    var email_content = email_blob.threads[email_id].content_plain; // this needs be sent to api
    // console.log(email_content);

    //step 2: send it to my app
    var report = $.post("https://localhost:8080/analyze",
    { text: email_content }, reportMaker);

  };


    // step 3: get/set the email body
    var body = function(body) {
      var el = this.dom('body');
      if(body) el.html(body + report);
      console.log('that is this', body + report);
      return el.html();
    };

  // step3: print on the email body
  // currently not working
  // gmail = new Gmail();
  // var email_text = compose.body();
  // console.log(email_text + report);


  // step4: click function that removes analysis



  //Returns the html element (button) of the last composed email
  var make_button = function(compose, type) {
    // gmail = new Gmail();
    gmail.tools.add_compose_button(
    compose,'•', click_handler, 'test_this' ); // using the "class"
  };

  // instantiates a new compose email
  gmail = new Gmail();
    gmail.observe.on(
      "compose", make_button
  );
    console.log( 'ready!' );
});
