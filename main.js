var tone = require('./response.js');
var $ = require('./jquery-1.12.4.js');
var d3 = require("d3");
var c3 = require("c3")
'use strict';


//Executes when the Document Object Model (DOM) is ready for JavaScript code
$( document ).ready(function() {

  var gmail = new Gmail();

  var make_emotion_array_for_d3 = function(data, status, compose) {
    var emotion_toneA  = "";
    var emotion_toneB  = "";
    var emotion_toneC  = "";
    var emotion_toneD  = "";
    var emotion_toneE  = "";
    var emotion_scoreA = "";
    var emotion_scoreB = "";
    var emotion_scoreC = "";
    var emotion_scoreD = "";
    var emotion_scoreE = "";

    emotion_toneA  = (data.document_tone.tone_categories[0].tones[0].tone_name);
    emotion_scoreA = (data.document_tone.tone_categories[0].tones[0].score*100);
    emotion_toneB  = (data.document_tone.tone_categories[0].tones[1].tone_name);
    emotion_scoreB = (data.document_tone.tone_categories[0].tones[1].score*100);
    emotion_toneC  = (data.document_tone.tone_categories[0].tones[2].tone_name);
    emotion_scoreC = (data.document_tone.tone_categories[0].tones[2].score*100);
    emotion_toneD  = (data.document_tone.tone_categories[0].tones[3].tone_name);
    emotion_scoreD = (data.document_tone.tone_categories[0].tones[3].score*100);
    emotion_toneE  = (data.document_tone.tone_categories[0].tones[4].tone_name);
    emotion_scoreE = (data.document_tone.tone_categories[0].tones[4].score*100);

    var emotion = [ emotion_toneA, emotion_scoreA, emotion_toneB, emotion_scoreB, emotion_toneC, emotion_scoreC, emotion_toneD, emotion_scoreD, emotion_toneE, emotion_scoreE ];

    var myWindow;

      function openWin() {
          myWindow = window.open("", "myWindow", "width=200,height=100");
          myWindow.document.write("<p>This is 'myWindow'</p>");
      }

      function closeWin() {
          myWindow.close();
      }
    // var email_content = compose.body();
    // compose.body(email_content, pie_chart(d3,c3, emotion));
    // var myWindown = window.open("tone", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
  };
  //     var myWindown = window.open("", "MsgWindow", "width=200, height=200");
  //       myWindown.document.getElementById("emotion_chart").innerHTML = (pie_chart(d3,c3,emotion));
  //
  // };

  var pie_chart = function(d3, c3, emotion) {
    var container = d3.select("div"); // container
    container.append("div")
      .text("Emotion Tone")
      .style("font-size", "15px")
      .style("margin-top", "30px")
      .style("margin-left", "48px")
      .attr("class", "tone_chart");
    container.append("div") //
      .attr("class", "tone_chart")
      .attr("id", "emotion_chart");

    var pie = c3.generate({
      size: {
        height: 300,
        width: 480
      },
      data: {
        columns: [
          [emotion[0], emotion[1]],
          [emotion[2], emotion[3]],
          [emotion[4], emotion[5]],
          [emotion[6], emotion[7]],
          [emotion[8], emotion[9]]
        ],
        type : 'pie',
      },
      color: {
        pattern: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]
      },
      bindto: '#emotion_chart',
    });
  };


  //
  // var make_social_array_for_d3 = function(data, status, compose) {
  //   var social_toneA = "";
  //   var social_toneB = "";
  //   var social_toneC = "";
  //   var social_toneD = "";
  //   var social_toneE = "";
  //   var social_scoreA = "";
  //   var social_scoreB = "";
  //   var social_scoreC = "";
  //   var social_scoreD = "";
  //   var social_scoreE = "";
  //
  //   social_toneA = (data.document_tone.tone_categories[2].tones[0].tone_name);
  //   social_scoreA = (data.document_tone.tone_categories[2].tones[0].score*100);
  //   social_toneB = (data.document_tone.tone_categories[2].tones[1].tone_name);
  //   social_scoreB = (data.document_tone.tone_categories[2].tones[1].score*100);
  //   social_toneC = (data.document_tone.tone_categories[2].tones[2].tone_name);
  //   social_scoreC = (data.document_tone.tone_categories[2].tones[2].score*100);
  //   social_toneD = (data.document_tone.tone_categories[2].tones[3].tone_name);
  //   social_scoreD = (data.document_tone.tone_categories[2].tones[3].score*100);
  //   social_toneE = (data.document_tone.tone_categories[2].tones[4].tone_name);
  //   social_scoreE = (data.document_tone.tone_categories[2].tones[4].score*100);
  //
  //   var social = [ social_toneA, social_scoreA, social_toneB, social_scoreB, social_toneC, social_scoreC, social_toneD, social_scoreD, social_toneE, social_scoreE ];
  //
  //   // var email_content = compose.body();
  //   // compose.body(email_content, pie_chart2(d3,c3, social));
  //   // window.open("pie_chart2(d3,c3, social)");
  //   };
  //
  // var pie_chart2 = function(d3, c3, social) {
  //   var container = d3.select(".aoX"); // container M9
  //   container.append("div") // creates an h1 and returns it
  //     .text("Social Tone") //operating on h1 sets text and returns the h1 element
  //     .style("font-size", "16px")
  //     .style("margin-top", "30px")
  //     .style("margin-left", "48px")
  //     .attr("class", "tone_chart");
  //   container.append("div") //
  //     .attr("class", "tone_chart")
  //     .attr("id", "social_chart");
  //
  //     var pie = c3.generate({
  //     size: {
  //       height: 300,
  //       width: 480
  //     },
  //     data: {
  //       columns: [
  //         [social[0], social[1]],
  //         [social[2], social[3]],
  //         [social[4], social[5]],
  //         [social[6], social[7]],
  //         [social[8], social[9]]
  //       ],
  //       type : 'pie',
  //     },
  //     color: {
  //       pattern: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]
  //     },
  //     bindto: '#social_chart',
  //   });
  // };

  // var make_language_array_for_d3 = function(data, status, compose) {
  //   var language_toneA = "";
  //   var language_toneB = "";
  //   var language_toneC = "";
  //   var language_scoreA = "";
  //   var language_scoreB = "";
  //   var language_scoreC = "";
  //
  //   language_toneA = (data.document_tone.tone_categories[1].tones[0].tone_name);
  //   language_scoreA = (data.document_tone.tone_categories[1].tones[0].score*100);
  //   language_toneB = (data.document_tone.tone_categories[1].tones[1].tone_name);
  //   language_scoreB = (data.document_tone.tone_categories[1].tones[1].score*100);
  //   language_toneC = (data.document_tone.tone_categories[1].tones[2].tone_name);
  //   language_scoreC = (data.document_tone.tone_categories[1].tones[2].score*100);
  //
  //
  //   var language = [ language_toneA, language_scoreA, language_toneB, language_scoreB, language_toneC, language_scoreC];
  //   console.log(language_toneA);
  //   console.log(language_scoreA);
  //   var email_content = compose.body();
  //   compose.body(email_content, pie_chart3(d3,c3, language));
  //   };
  //
  //
  // var pie_chart3 = function(d3, c3, language) {
  //   console.log(language);
  //   var container = d3.select(".aoX"); // container
  //   container.append("div")
  //     .text("Language Tone")
  //     .style("margin-top", "30px")
  //     .style("margin-left", "48px")
  //     .attr("class", "tone_chart");
  //   container.append("div") //
  //     .attr("class", "tone_chart")
  //     .attr("id", "language_chart");
  //
  //   var pie = c3.generate({
  //     size: {
  //       height: 300,
  //       width: 480
  //     },
  //     data: {
  //       columns: [
  //         [language[0], language[1]],
  //         [language[2], language[3]],
  //         [language[4], language[5]],
  //       ],
  //       type : 'pie',
  //     },
  //     color: {
  //       pattern: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]
  //     },
  //     bindto: '#language_chart',
  //   });
  // };



  var create_handler_for = function(compose) {
    var clicked = false; //
    var click_handler = function(event) {
      clicked = !clicked;
      console.log(clicked);

      // $(".Hq").mousedown(function() {
      //   console.log('are we here?');
      //   $(".Am.Al.editable.LW-avf").css('min-height', '0px');
      //   setTimeout(function(){
      //     $(".Am.Al.editable.LW-avf").css('min-height', '0px');
      //
      //   }, 500);
      // });
      if (clicked === true) {
        // step 1: get the compose text body
        var email_content = compose.body();
        // Step 2: Send it to my app
        $.post("https://tonalyze.herokuapp.com/analyze",
        // wrapped the reportMaker that takes data and status so that it could also pass through compose
        { text: email_content }, function(data, status) {
          // reportMaker(data, status, compose);
          // $(".Am.Al.editable.LW-avf").css('min-height', '0px');
          // step 3: call d3 functions
          make_emotion_array_for_d3(data, status, compose);
          // make_social_array_for_d3(data, status, compose);
          // make_language_array_for_d3(data, status, compose);
        }); // calling these 3 functions
      }
      // Step 4: Click function that removes analysis
      else if (clicked === false){
        d3.selectAll(".tone_chart").remove();
        // myWindow.close(); // this is what I want to remove the window
      }
    };
    return click_handler;
  };


  // Returns the html element (button) of the last composed email
  var make_button = function(compose, type) {
    // Makes a custom click_handler function for the window that is stored in the "compose" variable
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
