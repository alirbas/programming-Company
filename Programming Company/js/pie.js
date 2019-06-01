var margin = {top: -150, right: 0, bottom: 0, left: -10},
    width = 450 - margin.right - margin.left,
    height = 450 - margin.top - margin.bottom,
    radius = width/2;

    var color = d3.scaleOrdinal()
    .range(["#eaf6ff", "#e6f4ff", "#cfe9ff", "#b4ddff", "#9fd4ff", "#81c6ff", "#70beff" ,"#5eb6ff","#4aacfe","#36a3fd","#1b98ff","#008bff"]);


//-------------
var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

    var arc2= d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius-80);


var labelArc=d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 50);

var pie=d3.pie()
    .sort(null)
    .value(function (d) { return d.count; });

var svg=d3.select("body").append("svg")
    .attr("width",width+10)
    .attr("height",height)
    .append("g")
    .attr("transform","translate("+width/2+","+height/2+")");

var svg2=d3.select("body").append("svg")
    .attr("width",width+100)
    .attr("height",height)
    .append("g")
    .attr("transform","translate("+width/2+","+height/2+")");



d3.csv("data.csv",function(error,data){
    if  (error) throw error;

        data.forEach(function(d){
            d.count=+d.count;
            d.fruit=d.fruit;
        });
    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d",arc)
        .style("fill", function(d) {return color(d.data.fruit); })
        .transition()
        .ease(d3.easeLinear)
       .duration(2000)
       .attrTween("d", pietween);

    g.append("text")
        .transition()
        .ease(d3.easeLinear)
       .duration(2000)
        .attr("transform",function (d) {return "translate(" + labelArc.centroid(d) +
         ")";  })
        .attr("dy",".35em")
        .text(function(d) { return  d.data.fruit; } );

        //----------------------------------------------------

        var g2 = svg2.selectAll(".arc2")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc2");

    g2.append("path")
        .attr("d",arc2)
        .style("fill", function(d) {return color(d.data.fruit); })
        .transition()
        .ease(d3.easeLinear)
       .duration(2000)
       .attrTween("d", donutTween);

    g2.append("text")
        .transition()
        .ease(d3.easeLinear)
       .duration(2000)
        .attr("transform",function (d) {return "translate(" + labelArc.centroid(d) +
         ")";  })
        .attr("dy",".35em")
        .text(function(d) { return  d.data.fruit; } );

});

function pietween(b){
    b.innerRadius=0;
    var i=d3.interpolate ( { startAngle: 0 , endAngle:0   } ,b);
    return function(t) { return arc(i(t)); };
}

function donutTween(b){
    b.innerRadius=0;
    var i=d3.interpolate ( { startAngle: 0 , endAngle:0   } ,b);
    return function(t) { return arc2(i(t)); };
}
