var gmail;


function refresh(f) {
  if( (/in/.test(document.readyState)) || (typeof Gmail === undefined) ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}


var main = function(){
  // NOTE: Always use the latest version of gmail.js from
  // https://github.com/KartikTalwar/gmail.js
  gmail = new Gmail();
  console.log('Hello,', gmail.get.user_email());
};


//Returns the text of the first opened composed email:
var returns_text = function(){
  gmail = new Gmail(); // instantiate
  var email_id = gmail.get.compose_ids()[0];
  var email_blob = gmail.get.email_data(email_id);
  return email_blob.threads[email_id].content_plain;
};


//Returns the html element (button) of the first composed email
var make_button = function(compose, type) {
  gmail = new Gmail();
  var compose_ref = gmail.dom.composes()[0];
  gmail.tools.add_compose_button(compose_ref, '<div class="T-I J-J5-Ji T-I-KE L3" role="button" tabindex="0" gh="cm" style="-webkit-user-select: none;">ANALYZE</div>', function() {
  }, 'Custom Style Classes');
};


//Executes when the Document Object Model (DOM) is ready for JavaScript code
$( document ).ready(function() {
  gmail = new Gmail();
  gmail.observe.on("compose", make_button);
  console.log( "ready!" );
});

refresh(main);
