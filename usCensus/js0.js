$(".wrapper").delay(600).fadeIn(500);


function drawBarGraph(data,State) {
    console.log(data)

// var State = d3.map(data, function(d){return(d.state)}).keys()
            
  var status = ["Under 5 Years", "5 to 13 Years", "14 to 17 Years","18 to 24 Years","25 to 44 Years","45 to 64 Years","65 Years and Over" ];

  var colors = [ ["a", "#EF5350",],
                ["b", "#EF5350"],
                ["c", "#FFEFD5"],
                ["d", "#FFDAB9"],
                ["e", "#EEE8AA"],
                ["f", "#F0E68C"],
                ["g", "#BDB76B"],
            ];

  var margin = {top: 30, right: 30, bottom: 40, left: 60},
      width  = 860 - margin.left - margin.right,
      height = 290 - margin.top - margin.bottom;

  var z = d3.scale.ordinal()
  .range(["#EF5350", "#FFB74D", "#FFEB3B", "#66BB6A", "#80DEEA", "#29B6F6",  "#E1BEE7"]);

  var n = 51;


  var x = d3.scale
    .ordinal()
    .domain(State)
    .rangeRoundBands([0, width],1,0)

  var y = d3.scale
    .linear()
    .rangeRound([height, 0]);

  var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .ticks(51);

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(5)
  .tickFormat(d3.format(".2s")); // for the stacked totals version
  
  var svg = d3.select("#chart-bar")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var layers = d3.layout.stack()
  (status.map(function (c) {
    return data.map(function (d) {
      return {x: d.State, y: d[c]};
    });
  }));


  y.domain([0, 40000000])


  // gridlines in y axis function
  function make_y_gridlines() {
    return d3.svg.axis().scale(y)
      .orient("left").ticks(5);
  }

  // add the Y gridlines
  svg.append("g")
    .attr("class", "gridline")
    .call(make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
         );

  svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(6," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("transform", "translate(364,0)")
    .attr("y", "3em")
    .style("text-anchor", "middle")
    .text("States");

  svg.append("g")
    .attr("class", "axis axis--y")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", "-5em")
    .attr("y", "-2.5em")
    .style("text-anchor", "end")
    // .text("Number of calls sent");


  function type(d) {
    // d.date = parseDate(d.date);
    d.State;
    status.forEach(function (c) {
      d[c] = +d[c];
    });
    return d;
  }  
  
   var tooltip = d3.select("#chart-bar").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

  var layer = svg.selectAll(".layer")
  .data(layers)
  .enter().append("g")
  .attr("class", "layer")
  .style("fill", function (d, i) {
    return z(i);
  });

  layer.selectAll("rect")
    .data(function (d) {
    return d;
  })
    .enter().append("rect")
    .on("mouseover", function (d) {
    tooltip.transition()
      .duration(200)
      .style("opacity", 1);
    tooltip.html("<span>" + d.y + " calls" + "</span>")
      .style("left", (d3.event.pageX - 25) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
  })
    .on("mouseout", function (d) {
    tooltip.transition()
      .duration(500)
      .style("opacity", 0);
  })
      .attr("x", function (d) {
    return x(d.x);
  })
    .attr("y",  function(d) {
    return height;
  })
    .attr("width", 12)
    .attr("height", 0)
    .transition().duration(1500)
    .attr("y", function (d) {
    return y(d.y + d.y0);
  })
    .attr("height", function (d) {
    return y(d.y0) - y(d.y + d.y0);
  });

  // d3.select('button')
  // .attr(onclick=updateData())
}

function begining(d) {

d3.json("https://raw.githubusercontent.com/Penny8336/DV-homework2/master/csvjson%20(2).json", function (d){
  d3.selectAll("svg")
  .remove()
  min = d[50].total
  document.getElementById("States").innerHTML ="51" ;
  document.getElementById("min").innerHTML = "532668";
  var State=[]
  for(i=0;i<51;i++){State.push(d[i].State);}
  drawBarGraph(d,State)


})
}

function updateData(d) {
  d3.json("https://raw.githubusercontent.com/Penny8336/DV-homework2/master/csvjson%20(2).json", function (d){
    for (x in d) {
      var t = 0
      for(y in d[x]){
        if(isNaN(d[x][y] )){
        }
        else{
          t += d[x][y]
          d[x]["total"] = t
         }      
        }
      }
      console.log(d)
      d3.selectAll("svg")
      .remove()


      d.sort(function(a, b) { return b.total - a.total; })
      min = d[19].total
      document.getElementById("States").innerHTML ="20" ;
      document.getElementById("min").innerHTML = min;
      var State=[]
      for(i=0;i<20;i++){State.push(d[i].State);}
      console.log(d)
      d.splice(20,)

      drawBarGraph(d,State)
  })}

  begining()
  
$('.count').each(function () {
  $(this).prop('Counter',0).animate({
    Counter: $(this).text()
  }, {
    duration: 1500,
    easing: 'swing',
    step: function (now) {
      $(this).text(Math.ceil(now));
    }
  });
});