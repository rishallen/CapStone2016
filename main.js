var gmail;


function refresh(f) {
  if( (/in/.test(document.readyState)) || (typeof Gmail === undefined) ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}


var main = function() {
  // NOTE: Always use the latest version of gmail.js from
  // https://github.com/KartikTalwar/gmail.js
  gmail = new Gmail();
};


//Returns the html element (button) of the last composed email
var make_button = function(compose, type) {
  gmail = new Gmail();
  var compose_ref = gmail.dom.composes();
  gmail.tools.add_compose_button(compose_ref[compose_ref.length - 1], 'Analyze', function() {
    alert('you have invaded me');
  }, 'emailBlobButton' ); // using the "class"
};


//Executes when the Document Object Model (DOM) is ready for JavaScript code
$( document ).ready(function() {
  gmail = new Gmail();

    gmail.observe.on(
      "compose", make_button
    );
      console.log( 'ready!' );
});

// refresh(main);
