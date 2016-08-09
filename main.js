var gmail;


function refresh(f) {
  if( (/in/.test(document.readyState)) || (typeof Gmail === undefined) ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}


var main = function() {
  gmail = new Gmail();
  gmail.observe.on(
    "compose", make_button
  );
    console.log( 'ready!' );
};


//Returns the text of the first opened composed email:
var returns_text = function(){
  gmail = new Gmail(); // instantiate
  var email_id = gmail.get.compose_ids()[0];
  var email_blob = gmail.get.email_data(email_id);
  return email_blob.threads[email_id].content_plain;
};

//Returns the html element (button) of the last composed email
var make_button = function(compose, type) {
  gmail = new Gmail();
  var compose_ref = gmail.dom.composes();
  gmail.tools.add_compose_button(
  compose_ref[compose_ref.length - 1], 'Analyze', function() {
  var email_id = gmail.get.compose_ids()[0];
  var email_blob = gmail.get.email_data(email_id);
  var email_text = email_blob.threads[email_id].content_plain; // this needs be sent to api
  }, 'btn-primary' ); // using the "class"
};


refresh(main);
