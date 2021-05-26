//******************map****************************
var usmap = d3.select("#map")
    .append("svg")
    .attr("width", 800)
    .attr("height", 500)
    .attr("id", "pathSvg")

var mapimg = d3.select("#mapimg")
  .append("svg")
  .attr("height", 50)

var projection = d3.geoAlbersUsa().scale(650).translate([400, 250])
var path = d3.geoPath().projection(projection) //創造path

var projectionSquare = d3.geoMercator()
    .scale(1450) // This is the zoom
    .translate([2800, 1380]); // You have to play with these values to center your map
var pathSquare = d3.geoPath().projection(projectionSquare) //創造path

var data = d3.map();
var areadata = d3.map();
var scale = [100000, 5000000, 9000000, 7000000, 10000000, 500000000]
var areascale =[10, 100000, 200000, 300000, 1500000, 2000000]
var colorScale = d3.scaleThreshold()
  .domain(scale)
  .range(d3.schemeGreens[6]);

var areacscale = d3.scaleThreshold()
  .domain(areascale)
  .range(d3.schemeGreens[6]);

var areachangeColor = d3.scaleThreshold()
  .domain(areascale)
  .range(d3.schemeSpectral[6]);

  var schemeSpectral = ["#d53e4f","#fee08b","#fee08b", "#e6f598","#3288bd"];
  var schemeGreens = ["#edf8e9","#c7e9c0","#a1d99b", "#74c476","#006d2c"];


var changeColor = d3.scaleThreshold()
  .domain(scale)
  .range(d3.schemeSpectral[6]);

var star = "https://svgshare.com/i/Kpp.svg"
var redot= "https://svgshare.com/i/KpG.svg"
var light = "https://svgshare.com/i/KqU.svg"
var cloud = "https://svgshare.com/i/KpU.svg"
var people = "https://svgshare.com/i/Kp5.svg"

var or1 = textures.lines().orientation("1/8").stroke("darkorange");
var or2 = textures.lines().orientation("2/8").stroke("darkorange");
var or3 = textures.lines().orientation("3/8").stroke("darkorange");
var or4 = textures.lines().orientation("4/8").stroke("darkorange");
var or5 = textures.lines().orientation("5/8").stroke("darkorange");

var text1 = textures.lines().size(4).strokeWidth(1).lighter(0.8);
var text2 = textures.lines().size(10).strokeWidth(1).lighter(0.8);
var text3 = textures.lines().size(20).strokeWidth(1).lighter(0.8);
var text4 = textures.lines().heavier(1);
var text5 = textures.lines().heavier(5).thinner(0.9);

var dot1 = textures.circles().thinner();
var dot2 = textures.circles();
var dot3 = textures.circles().complement();
var dot4 = textures.circles().thicker();
var dot5 = textures.circles().size(5);

var orlist = [or1, or2, or3, or4, or5];
var tlist = [text1, text2, text3, text4, text5];
var dotlist = [dot1, dot2, dot3, dot4, dot5];
var shapelist = [star,cloud,light, people,redot];
var sizelist = ["3","12","20", "28","40"];

var State=[]
var Census=[]
var mapdata=[]
var temp = null //tempforpopandarea
var total = 0

//****************bar chart************************
var colors = [ ["a", "#EF5350",], ["b", "#EF5350"], ["c", "#FFEFD5"], ["d", "#FFDAB9"], ["e", "#EEE8AA"], ["f", "#F0E68C"], ["g", "#BDB76B"],];

var margin = {top: 30, right: 50, bottom: 40, left: 40},
width  = 800 - margin.left - margin.right,
height = 330 - margin.top - margin.bottom;

var z = d3.scaleOrdinal()
.range(["#EF5350", "#FFB74D", "#FFEB3B", "#66BB6A", "#80DEEA", "#29B6F6",  "#E1BEE7"]);

var y = d3.scaleLinear()
  .rangeRound([height, 0]);

var yAxis = d3.axisLeft(y).ticks(5)
  .tickFormat(d3.format(".2s")); // for the stacked totals version

var barchart = d3.select("#chart-bar")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


function over(item){
  d3.select("#map").selectAll("#" +item)
    .transition()
    .duration(200)
    .style("opacity", 0.8)
    .style("stroke", "black")
    .style("stroke-width", "3")

  d3.select("#chart-bar").selectAll("#" +item)
    .transition()
    .duration(200)
    .style("opacity", 0.8)
    .style("stroke", "black")
    .style("stroke-width", "1.5")    
}

function leave(item){
  d3.select("#map").selectAll("#" +item)
  .transition()
  .duration(200)
  .style("opacity", 0.8)
  .style("stroke-width", "0.5")
  // .style("fill", "#f8f8e9")
  .style("stroke", "black")

  d3.select("#chart-bar").selectAll("#" +item)
  .transition()
  .duration(200)
  .style("stroke", "black")
  .style("stroke-width", "0")
}

//***************** intervation ************************* */
let barMouseOver = function(d) {
  choose = String(d.data.State)
  over(choose)
  console.log(d)
  document.getElementById("statename").innerHTML=d.data.State
  document.getElementById("population").innerHTML=d.data.total
  document.getElementById("area").innerHTML=d.data.Area
  document.getElementById("1").innerHTML=d.data.Under5Years
  document.getElementById("2").innerHTML=d.data.to13Years
  document.getElementById("3").innerHTML=d.data.to17Years
  // document.getElementById("4").innerHTML=d.data.to24Years
  // document.getElementById("5").innerHTML=d.data.to44Years
  // document.getElementById("6").innerHTML=d.data.to64Years
  // document.getElementById("7").innerHTML=d.data.YearsandOver
  }

let barMouseLeave = function(d) {
  choose = String(d.data.State)
  leave(choose)
  }

let mouseOver = function(d) {
  choose = String(d.properties.state)
  over(choose)
  document.getElementById("statename").innerHTML=d.properties.NAME
  document.getElementById("population").innerHTML=d.total
  }

let mouseLeave = function(d) {
  choose = String(d.properties.state)
  leave(choose)
}    

//***************** intervation end ********************** */

function getmap(topo){
  usmap.append("g")
.selectAll("path")
.data(topo.features)
.enter()
.append("path")
.attr("d", d3.geoPath()
.projection(projection))
.style("fill", "#f8f8e9")
.style("stroke", "black")
.style("opacity", .5)
.on("mouseover", mouseOver )
.on("mouseleave", mouseLeave )
.attr("id",function(d) { 
  return d.properties.state; })
}

function gettext(topo){
  usmap.append("g")
  .selectAll("labels")
  .data(topo.features)
  .enter()
  .append("text")
    .attr("x", function(d){return path.centroid(d)[0]}) 
    .attr("y", function(d){return path.centroid(d)[1]})
    .text(function(d){ return d.properties.state})
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "central")
    .style("font-size", 10)
    .style("fill", "black")
    .attr("id", "maptext")
}
//*****************bar chart end************************ */  
function ready(error, topo, census) {
  temp = "pop"
  mapdata= topo
  Census = census

//*****************bar chart function******************* */
  for(i=0;i<51;i++){
    State.push(Census[i].State);}

    var x = d3.scaleBand()
      .range([0, width])
      .domain(State)
      .padding([1])
      var xAxis = d3.axisBottom(x).tickSizeOuter(0);

    // console.log(State)
    var status = ["Under5Years", "to13Years", "to17Years","to24Years","to44Years","to64Years","YearsandOver" ];

    function make_y_gridlines() {
      return d3.axisLeft(y).ticks(5);
}

    // console.log(keys)
    y.domain([0, 40000000])
    z.domain(status);
    // console.log(status)

    // add the Y gridlines
    barchart.append("g")
      .attr("class", "gridline")
      .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
          );

    barchart.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(6," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("transform", "translate(364,0)")
      .attr("y", "3em")
      .style("text-anchor", "middle")
      .text("States");

    barchart.append("g")
      .attr("class", "axis axis--y")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", "-5em")
      .attr("y", "-2.5em")
      .style("text-anchor", "end")
      // .text("Number of calls sent");

    var layer = barchart.selectAll(".layer")
      .data(d3.stack().keys(status)(census))
      .enter().append("g")
      .attr("class", "layer")
      .style("fill", function (d, i) {
        return z(i);
        
      });

    var stack = barchart.selectAll(".stack")
      .data(d3.stack().keys(State)(census))


    layer.selectAll("rect")
      .data(function (d) {
        // console.log(d)
      return d;
    })
    .enter().append("rect")

    .on("mouseover", barMouseOver )
    .on("mouseleave", barMouseLeave )
    .attr("id", function(d) { 
      return d.data.State; })

    .attr("x", function(d) { 
      // console.log(d.data.State)
      return x(d.data.State); })
    .attr("y",  function(d) {
      return height})
    .attr("width", 10)
    .attr("height", 0)
    .transition().duration(1500)
    .attr("y", function(d) { 
      return y(d[1]); })
    .attr("height", function (d) {
      return y(d[0]) - y(d[1]); })
    // .on("mouseover", barMouseOver )
    // .on("mouseleave", barMouseLeave )

//******************bar chart fucntion end ************** */    

//**************************map************************** */
  getmap(topo)
  gettext(topo)
  }

//**********************map end************************** */    

function range (d,list) {
  if(temp == "pop"){
    d.total = data.get(d.properties.state) || 0
    if (0 == d.total)
    return list[0].url()
        
    else if (d.total>scale[3])
    return  list[4].url()
  
    else if (d.total>scale[2])
    return  list[3].url()
        
    else if (d.total>scale[1])
    return  list[2].url()
    else if (d.total>scale[0])
    return  list[1].url()
  }
  else{
    d.area = areadata.get(d.properties.state) || 0
    console.log(d.area)
    if (d.area>areascale[4])
    return  list[4].url()
  
    else if (d.area>areascale[3])
    return  list[3].url()
        
    else if (d.area>areascale[2])
    return  list[2].url()
    else if (d.area>areascale[1])
    return  list[1].url()
    else if (d.area == 0)
    return  list[0].url()
    else if (d.area>areascale[0])
    return  list[0].url()

  }
}

function rangesvg (d,list) {
  if(temp == "pop"){
    d.total = data.get(d.properties.state) || 0
    if (0 == d.total) return list[0]
    else if (d.total>scale[3]) return  list[4]
    else if (d.total>scale[2]) return  list[3]
    else if (d.total>scale[1]) return  list[2]
    else if (d.total>scale[0]) return  list[1]
  }
  else{
    d.area = areadata.get(d.properties.state) || 0
    console.log(d.area)
    if (d.area>areascale[4]) return  list[4]
    else if (d.area>areascale[3]) return  list[3]
    else if (d.area>areascale[2]) return  list[2]
    else if (d.area>areascale[1]) return  list[1]
    else if (d.area == 0) return  list[0]
    else if (d.area>areascale[0]) return  list[0]
  }
}

//********************** SIZE ************************** */    
function SIZE (){
  legR()
  $('#low').show();
  movetext()
  $('image').remove();
  ori()
  getmap(mapdata)

  usmap.append("g")
  .selectAll("labels")
  .data(mapdata.features)
  .enter()
  .append("rect")
    .attr("x", function(d){ 
      return path.centroid(d)[0]-10}) 
    .attr("y", function(d){return path.centroid(d)[1]-13})
    .attr("width", 15)
    .attr("height", function(d){return rangesvg(d,sizelist)})
    .style("opacity", .5)
    .style("fill","#A3E4D7")
    .style("stroke","#16A085")
    .style("stroke-width",3)
    .attr("id", "rrect")

    for (i=0;i<5;i++){
      mapimg.append("g")
      .append("rect")
      .attr("width", 15)
      .attr("height", function(d){return sizelist[i]})
      .attr("x", 150+ i*25) 
      .attr("y",50+ 0 -  sizelist[i] )
      .style("opacity", .5)
      .style("fill","#A3E4D7")
      .style("stroke","#16A085")
      .style("stroke-width",3)
      .attr("id", "imgS")

    }
  }
//********************** SIZE end ************************* */    

function getcolor(d, tempdata,tempitem, tempcolor){

  d.tempitem = tempdata.get(d.properties.state) || 0;
  return tempcolor(d.tempitem);  
}

// getmap(mapdata)


// ********************* value **************************** */ 
function VALUE(){
  $('#low').show();
  legR()
  move()
  movetext()
  d3.select("#map")
  .selectAll("path")
  .attr("fill", function (d) { 
    console.log(d)
    if(temp == "pop"){
      return getcolor(d,data,total,colorScale)
    }
    else{
      return getcolor(d, areadata,area,areacscale)
    }})
  .style("opacity", 0.8)
  .style("stroke", "black")

  for (i=0;i<5;i++){
    mapimg.append("g")
    .append("rect")
    .attr("fill",  function(d) { return schemeGreens[i]})
    .attr("width", 20)
    .attr("height", 20)
    .attr("x", 150+ i*25) 
    .attr("y", 30)
    .style("stroke", "black")
    .attr("id", "imgS")

  }

}
// ********************* value end ************************* */ 
// ********************* orientation **************************** */ 
function OR(){
  legR()
  $('#low').show();
  movetext()
  ori()
  $('image').remove();
  getmap(mapdata)
  var text = d3.select("#pathSvg")
  var myle = d3.select("#imgS")
  orlist.forEach(function(t) {
    myle.call(t)
    text.call(t);
      });

          // Draw the map
        usmap.append("g")
          .selectAll("path")
          .data(mapdata.features)
          .enter()
          .append("path")
          // draw each country
          .attr("d", d3.geoPath()
          .projection(projection))
          .style("stroke", "black")
          .on("mouseover", mouseOver )
          .on("mouseleave", mouseLeave )
          .attr("id","Path")
          .attr("fill",function(d) { return range(d,orlist)})

          for (i=0;i<5;i++){
            mapimg.append("g")
            .append("rect")
            .attr("fill",  function(d) { return orlist[i].url()})
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 150+ i*25) 
            .attr("y", 30)
            .style("stroke", "black")
            .attr("id", "imgS")

          }


}
// ******************** orientation end ************************* */ 
var total = 0
//**********************changecolor ************************** */    

function changecolor(){
  legR()
  $('#low').show();
  move()
  d3.select("#map")
  .selectAll("path")
  .attr("fill", function (d) { 
    if(temp == "pop"){
      return getcolor(d,data,total,changeColor)
    }
    else{
      return getcolor(d, areadata,area,areachangeColor)
    }})
  .style("opacity", 0.8)
  .style("stroke", "black")

  for (i=0;i<5;i++){
    mapimg.append("g")
    .append("rect")
    .attr("fill",  function(d) { return schemeSpectral[i]})
    .attr("width", 20)
    .attr("height", 20)
    .attr("x", 150+ i*25) 
    .attr("y", 30)
    .style("stroke", "black")
    .attr("id", "imgS")

  }

}
//**********************changecolor end************************** */    
//************************** SHAPE *************************** */    

function SHAPE (){
  legR()
  $('#low').show();
  movetext()
  ori()
  getmap(mapdata)

    usmap.append("g")
    .selectAll("labels")
    .data(mapdata.features)
    .enter()
    .append("svg:image")
      .attr("x", function(d){ 
        return path.centroid(d)[0]-15}) 
      .attr("y", function(d){return path.centroid(d)[1]-15})
      .attr("xlink:href",  function(d) { return rangesvg(d,shapelist)})
      .attr("width", 20)
      .attr("height", 20)
      
      for (i=0;i<5;i++){
        mapimg.append("g")
        .append("svg:image")
        .attr("xlink:href",  function(d) { return shapelist[i]})
        .attr("width", 23)
        .attr("height", 23)
        .attr("x", 143+ i*27) 
        .attr("y", 26)
        .attr("id", "imgS")

      }
    }
//********************** SHAPE end ************************** */   
//********************** TEXTURE ************************** */    

function TEXTURE(){
  legR()
  $('#low').show();
  movetext()
  $('image').remove();
  ori()
  getmap(mapdata)
  var text = d3.select("#pathSvg")
  var myle = d3.select("#imgS")

  tlist.forEach(function(t) {
    myle.call(t)
    text.call(t);
      });
          // Draw the map
        usmap.append("g")
          .selectAll("path")
          .data(mapdata.features)
          .enter()
          .append("path")
          // draw each country
          .attr("d", d3.geoPath()
          .projection(projection))
          .style("stroke", "black")
          .on("mouseover", mouseOver )
          .on("mouseleave", mouseLeave )
          .attr("id","Path")
          .attr("fill",function(d) { return range(d,tlist)})

          for (i=0;i<5;i++){
            mapimg.append("g")
            .append("rect")
            .attr("fill",  function(d) { return tlist[i].url()})
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 150+ i*25) 
            .attr("y", 30)
            .style("stroke", "black")
            .attr("id", "imgS")

          }

}
//********************** TEXTURE end ************************* */    

   
  function move(){
    var x = document.querySelectorAll("Path")
    $('defs').remove();
    $('image').remove();
    $('path').removeAttr("style");



    d3.selectAll("path").attr("fill", "#f8f8e9")
    // $('path').removeAttr("fill");

        // for(i=0;i<52;i++){
    //   x[i].removeAttribute("style")
    //   x[i].removeAttribute("fill")
    //   x[i].removeAttribute("attr")
    // }
  }

  function ori(){
    $('path').remove();
    $('defs').remove();
    $('path').removeAttr("style");

     }
    
  function legR(){
    for(i=0;i<6;i++){  
    $('#imgS').remove()
    
    }  
  }


  function movetext(){
    for(i=0;i<52;i++){  $('#maptext').remove()
    $('#rrect').remove()

    }  
  }
//************************* start *************************** */    
// ************************* INFO ****************************
function areaInfo(){
  $('.my-legend').show();
  $('.vbroadcast-legend').hide();
  temp = "area"
  console.log(temp)
  d3.select("#chart-bar").selectAll(".layer")
  .remove()

  var x = d3.scaleBand()
    .range([0, width])
    .domain(State)
    .padding([1])
  
  var xAxis = d3.axisBottom(x).tickSizeOuter(0);
  
  var area = ["Area"];
  
  y.domain([0, 2000000])
  z.domain(status);

  barchart.append("g")
  .attr("class", "axis axis--y")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", "-5em")
  .attr("y", "-2.5em")
  .style("text-anchor", "end")
 
    var layer = barchart.selectAll(".layer")
      .data(d3.stack().keys(area)(Census))
      .enter().append("g")
      .attr("class", "layer")
      .style("fill", function (d, i) {
        return z(i);
        });
  
      var stack = barchart.selectAll(".stack")
        .data(d3.stack().keys(State)(Census))
  
  
      layer.selectAll("rect")
        .data(function (d) {
          // console.log(d)
        return d;
      })
      .enter().append("rect")
      .attr("id", function(d) { 
        return d.data.State; })
  
      .on("mouseover", barMouseOver )
      .on("mouseleave", barMouseLeave )
      .attr("x", function(d) { 
        return x(d.data.State); })
      .attr("y",  function(d) {
        return height})
      .attr("width", 10)
      .attr("height", 0)
      .transition().duration(1500)
      .attr("y", function(d) { 
        return y(d[1]); })
      .attr("height", function (d) {
        return y(d[0]) - y(d[1]); })  
    }
// // *********************** INFO end **************************
function type(d, i, columns) {
  console.log(d)
  console.log(i)
  console.log(columns)
  for (i = 1, t = 0; i < 8; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  data.set(d.State, +d.total)
  areadata.set(d.State, +d.Area)
  // console.log(areadata)
  $('.my-legend').hide();
  $('#low').hide();

  return d;
} 

d3.select("#map").selectAll("g")
  .remove()
  d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/Penny8336/DV-homework2/master/usmap.json")
  .defer(d3.csv, "https://raw.githubusercontent.com/Penny8336/DV-homework2/master/census.csv",type)
  .await(ready);
