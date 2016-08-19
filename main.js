var tone = require('./response.js');
var $ = require('./jquery-1.12.4.js');


//Executes when the Document Object Model (DOM) is ready for JavaScript code
$( document ).ready(function() {

  var click_handler = function(compose) {
    return function() {
      console.log('click!');

      // step1: get the compose text body
      var email_id = compose.email_id;
      var email_blob = gmail.get.email_data(email_id);
      var email_content = email_blob.threads[email_id].content_plain; // this needs be sent to api

      console.log(email_content);

      // // sending to api
      // console.log(tone.analysis());//email content go in as a variable which is a function

      //step 2: send it to my app
      $.post("https://localhost:8080/analyze",
      {
          text: email_content
      },
      function(data, status){
          //  alert("Data: " + data + "\nStatus: " + status);
        apiResponseTones = data.document_tone.tone_categories[0].tones;
        var tones = {};
        var i;
        for (i = 0; i < apiResponseTones.length; i++) {
          tones += apiResponseTones[i] + "<br>";
        }
        console.log(tones);

        // step 3: email body + the json response from API
          var email_text = compose.body();
          compose.body(email_text + tones);


          console.log('this works');
      });
    };
  };

  //Returns the html element (button) of the last composed email
  var make_button = function(gmail) {
    return function(compose, type) {
      gmail.tools.add_compose_button(
      compose,'•', click_handler(compose), 'test_this' ); // using the "class"
    };
  };


  var gmail = new Gmail();
  gmail.observe.on(
    "compose", make_button(gmail)
  );
  console.log( 'ready!' );
});

// refresh(main);
// 3 variables inside the larger function we are using
