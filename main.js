var tone = require('./response.js');
var $ = require('./jquery-1.12.4.js');
var d3 = require("d3");
var c3 = require("c3")
'use strict';



//Executes when the Document Object Model (DOM) is ready for JavaScript code
$( document ).ready(function() {
  var gmail = new Gmail();

  // Cleans up api response
  var reportMaker = function(data, status, compose){
    var report = "";
    for (var item in data) {
      for (var subItem in data[item]) {
        var categories = data[item][subItem];
        for  (var i = 0; i < categories.length; i++) {
          var category = categories[i];
          report += category.category_name; // print
          for (var j = 0; j < category.tones.length; j++) {
            var tone = category.tones[j];
            report += tone.tone_name; // print
            // console.log(report);
            report += tone.score;  // print
          }
        }
      }
    }
  };

  var make_emotion_array_for_d3 = function(data, status, compose) {
    var emotion_toneA = "";
    var emotion_toneB = "";
    var emotion_toneC = "";
    var emotion_toneD = "";
    var emotion_toneE = "";
    var emotion_scoreA = "";
    var emotion_scoreB = "";
    var emotion_scoreC = "";
    var emotion_scoreD = "";
    var emotion_scoreE = "";

    emotion_toneA = (data.document_tone.tone_categories[0].tones[0].tone_name);
    emotion_scoreA = (data.document_tone.tone_categories[0].tones[0].score*100);
    emotion_toneB = (data.document_tone.tone_categories[0].tones[1].tone_name);
    emotion_scoreB = (data.document_tone.tone_categories[0].tones[1].score*100);
    emotion_toneC = (data.document_tone.tone_categories[0].tones[2].tone_name);
    emotion_scoreC = (data.document_tone.tone_categories[0].tones[2].score*100);
    emotion_toneD = (data.document_tone.tone_categories[0].tones[3].tone_name);
    emotion_scoreD = (data.document_tone.tone_categories[0].tones[3].score*100);
    emotion_toneE = (data.document_tone.tone_categories[0].tones[4].tone_name);
    emotion_scoreE = (data.document_tone.tone_categories[0].tones[4].score*100);
    var emotion = [ emotion_toneA, emotion_scoreA, emotion_toneB, emotion_scoreB, emotion_toneC, emotion_scoreC, emotion_toneD, emotion_scoreD, emotion_toneE, emotion_scoreE ];
    var email_content = compose.body();
    pie_chart(d3, emotion);// Step 3: display a pie chart
    };

    var pie_chart = function(d3, emotion) {
      var dataset = [
        {"label":emotion[0], "value":emotion[1]},
        {"label":emotion[2], "value":emotion[3]},
        {"label":emotion[4], "value":emotion[5]},
        {"label":emotion[6], "value":emotion[7]},
        {"label":emotion[8], "value":emotion[9]}
      ];


      var width = 200;
      var height = 200;
      var offset = 20;
      var radius = Math.min(width, height) / 2;


      var color = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

      var legend = d3.select(".M9")
        .append("svg")
        .attr("class", "tone_chart")
        .attr("width", 120)
        .attr("height", (dataset.length) * 20)
        .style("padding-left", "46px")
        .style("padding-bottom", "200px")
      .selectAll("g")
        .data(dataset)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .attr('fill', function(d, i) {
            return color(d.label);
            });

        legend.append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .text(function(d) { return d.label; });

      var svg = d3.select('.M9')
      // outer image element
        .append('svg')
        .classed('tone_chart', true)
        .attr('width', width )
        .attr('height', height + offset)
        .style('margin-top', '35px')
        .style("margin-left", "3px");
        // Chart
        var chart = svg.append('g')
        .attr('transform', 'translate(' + (width / 2) +
          ',' + (height / 2 + offset) + ')');
        chart.append('g')
          .attr("class", "slices");
        chart.append('g')
          .attr("class", "labels");
          // title
        chart.append("text")
          .attr("x", 0)
          .attr("y", -108)
          .attr("class","title")
          .style("text-anchor", "middle")
          .text("Eomtion Tone");





      var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      var labelArc = d3.arc()
        .outerRadius(radius - 50)
        .innerRadius(radius - 50);

      var pie = d3.pie()
        .value(function(d) { return d.value; })
        .sort(null);

      var path = svg.select('.slices')
        .selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d, i) { return color(d.data.label);})
        .on("mouseenter", function(d) {
            d3.select(this)
               .attr("stroke","white")
               .transition()
               .duration(1000)
               .attr("d", arcOver)
               .attr("stroke-width",6);
         })
        .on("mouseleave", function(d) {
            d3.select(this).transition()
               .attr("d", arc)
               .attr("stroke","none");
        });

        /* ------- TEXT LABELS -------*/
        var key = function(d){ return d.data.value.toFixed() + '%'; };
        var text = svg.select(".labels").selectAll("text")
          .data(pie(dataset), key);

        text.enter()
          .append("text")
          .attr("dy", ".35em")
          .style("font-size", "8px")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .text(function(d) {
            // put percision right between data and value
            return d.data.value.toFixed() + '%';
          });

        text.attr('fill', function(d, i) {
       return color(d.data.label);
        });


      };
      // var pie_chart = function(d3, emotion) {
      //   // var email_content = compose.body();
      //   // console.log(emotion[2]);
      //
      //   data = [
      //           {"label":emotion[0], "value":emotion[1]},
      //           {"label":emotion[2], "value":emotion[3]},
      //           {"label":emotion[4], "value":emotion[5]},
      //           {"label":emotion[6], "value":emotion[7]},
      //           {"label":emotion[8], "value":emotion[9]}
      //         ];
      //
      // var w = 300, //width
      //   h = 300, //height
      //   r = 100, //radius
      //
      //   color = d3.scaleOrdinal()
      //     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
      //
      //
      //   var vis = d3.select(".M9")
      //       .append("svg:svg")              //create the SVG element inside the <body>
      //       .classed("tone_chart", true)       // create the class that SVG will find in the <body>
      //       .data([data])                   //associate our data with the document
      //           .style("padding-top", "25px")
      //           .style("padding-left", "38px")
      //           .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
      //           .attr("height", h)
      //       .append("svg:g")                //make a group to hold our pie chart
      //           .attr("transform", "translate(" + r + "," + r + ")");    //move the center of the pie chart from 0, 0 to radius, radius
      //
      //   var arc = d3.arc()              //this will create <path> elements for us using arc data
      //       .outerRadius(r);
      //
      //   var pie = d3.pie()           //this will create arc data for us given a list of values
      //       .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array
      //
      //   var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
      //       .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
      //       .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
      //           .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
      //               .attr("class", "slice");    //allow us to style things in the slices (like text)
      //
      //       arcs.append("svg:path")
      //               .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
      //               .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function
      //
      //       arcs.append("svg:text")                                     //add a label to each slice
      //               .attr("transform", function(d) {                    //set the label's origin to the center of the arc
      //               //we have to make sure to set these before calling arc.centroid
      //               d.innerRadius = 0;
      //               d.outerRadius = r;
      //               return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
      //           })
      //           .attr("text-anchor", "middle")                          //center the text on it's origin
      //           .text(function(d, i) { console.log(data[i]); return data[i].label; });        //get the label from our original data array
      //
      //         };


  var create_handler_for = function(compose) {
    var clicked = false; // closed over by the click handler function
    var click_handler = function(event) {
      clicked = !clicked;
      console.log(clicked);
      if (clicked === true) {
        // step 1: get the compose text body
        var email_content = compose.body();
        // Step 2: Send it to my app
        $.post("https://localhost:8080/analyze",
        // wrapped the reportMaker that takes data and status so that it could also pass through compose
        { text: email_content }, function(data, status) {
          reportMaker(data, status, compose);
          make_emotion_array_for_d3(data, status, compose);
        }); // calling reportMaker function
      }
      // Step 4: Click function that removes analysis
      else if (clicked === false){
        d3.selectAll(".tone_chart").remove();
      }
    };
    return click_handler;
  };


  // Returns the html element (button) of the last composed email
  var make_button = function(compose, type) {
    // Make a custom click_handler function for the window that is stored in the "compose" variable
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
