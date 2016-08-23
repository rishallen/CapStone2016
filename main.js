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
        //  alert("Data: " + data + "\nStatus: " + status)
        for (var item in data) {
           //console.log(data[item]);
           for (var subItem in data[item]) {
             var categories = data[item][subItem];
             for  (var i = 0; i < categories.length; i++) {
               var category = categories[i];
               console.log(category.category_name);
             // 	var categoryName = (category.category_name); // this will be printed to the screen
               for (var j = 0; j < category.tones.length; j++) {
                var tone = category.tones[j];
       	        console.log(tone.tone_name); // have a single string that I build with concantenation 
                console.log(tone.score);
               }
           }
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
