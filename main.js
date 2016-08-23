var tone = require('./response.js');
var $ = require('./jquery-1.12.4.js');


//Executes when the Document Object Model (DOM) is ready for JavaScript code
$( document ).ready(function() {
  var gmail;

  var main = function() {
    gmail = new Gmail();
  };


  //Returns the text of the first opened composed email:
  // var returns_text = function(){
  //   gmail = new Gmail(); // instantiate
  //   var email_id = gmail.get.compose_ids()[0];
  //   var email_blob = gmail.get.email_data(email_id);
  //   return email_blob.threads[email_id].content_plain; // this needs be sent to api
  // };

  var click_handler = function(event) {
    // console.log('click!', event);
    console.log(event);

    // step1: get the compose text body
    var email_id = gmail.get.compose_ids()[gmail.get.compose_ids().length - 1];
    console.log(email_id);
    var email_blob = gmail.get.email_data(email_id);
    var email_content = email_blob.threads[email_id].content_plain; // this needs be sent to api

    console.log(email_content);

    // // sending to api
    // console.log(tone.analysis());//email content go in as a variable which is a function

    //step 2: send it to my app
    var tones = $.post("https://localhost:8080/analyze",
    {
        text: email_content
    },

    function(data, status){
        //  alert("Data: " + data + "\nStatus: " + status);
      var tone = data;
        for (var item in tone) {
          for (var subItem in tone[item]) {
    	    console.log(tone[item][subItem][0].category_name);
    	    console.log(tone[item][subItem][0].tones[0].tone_name);
          console.log(tone[item][subItem][0].tones[0].score);
          console.log(tone[item][subItem][0].tones[1].tone_name);
          console.log(tone[item][subItem][0].tones[1].score);
          console.log(tone[item][subItem][0].tones[2].tone_name);
          console.log(tone[item][subItem][0].tones[2].score);
          console.log(tone[item][subItem][0].tones[3].tone_name);
          console.log(tone[item][subItem][0].tones[3].score);
          console.log(tone[item][subItem][0].tones[4].tone_name);
          console.log(tone[item][subItem][0].tones[4].score);
    	    console.log(tone[item][subItem][1].category_name);
    	    console.log(tone[item][subItem][1].tones[0].tone_name);
          console.log(tone[item][subItem][1].tones[0].score);
          console.log(tone[item][subItem][1].tones[1].tone_name);
          console.log(tone[item][subItem][1].tones[1].score);
          console.log(tone[item][subItem][1].tones[2].tone_name);
          console.log(tone[item][subItem][1].tones[2].score);
    	    console.log(tone[item][subItem][2].category_name);
    	    console.log(tone[item][subItem][2].tones[0].tone_name);
          console.log(tone[item][subItem][2].tones[0].score);
          console.log(tone[item][subItem][2].tones[1].tone_name);
          console.log(tone[item][subItem][2].tones[1].score);
          console.log(tone[item][subItem][2].tones[2].tone_name);
          console.log(tone[item][subItem][2].tones[2].score);
          console.log(tone[item][subItem][2].tones[3].tone_name);
          console.log(tone[item][subItem][2].tones[3].score);
          console.log(tone[item][subItem][2].tones[4].tone_name);
          console.log(tone[item][subItem][2].tones[4].score);

        }
      }
      // step 3: email body + the json response from API
      // function setItemBody() {
      //   gmail = new Gmail();
        // var email_text = compose.body();
        // console.log(email_text + tones);
      // }

    });
  };



  //Returns the html element (button) of the last composed email
  var make_button = function(compose, type) {
    gmail = new Gmail();
    gmail.tools.add_compose_button(
    compose,'•', click_handler, 'test_this' ); // using the "class"
  };


  gmail = new Gmail();
    gmail.observe.on(
      "compose", make_button
    );
      console.log( 'ready!' );
});

// refresh(main);
// 3 variables inside the larger function we are using
