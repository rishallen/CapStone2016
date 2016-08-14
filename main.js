// var tone = require('./tone.js');
// var ladybug = require('./ladybug.png');

//Executes when the Document Object Model (DOM) is ready for JavaScript code
$( document ).ready(function() {
  var gmail;

  var main = function() {
    gmail = new Gmail();
  };


  //Returns the text of the first opened composed email:
  var returns_text = function(){
    gmail = new Gmail(); // instantiate
    var email_id = gmail.get.compose_ids()[0];
    var email_blob = gmail.get.email_data(email_id);
    return email_blob.threads[email_id].content_plain; // this needs be sent to api
  };

  //Returns the html element (button) of the last composed email
  var make_button = function(compose, type) {
    gmail = new Gmail();
    gmail.tools.add_compose_button(
    compose,'Toniz', click_handler, 'test_this' ); // using the "class"
  };



  gmail = new Gmail();
    gmail.observe.on(
      "compose", make_button
    );
      console.log( 'ready!' );
});

// refresh(main);
// 3 variables inside the larger function we are using
