// set constants
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS1_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS1_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 
const VIS2_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS2_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 
 
// make svg frame for vis1
const FRAME1 = d3.select("#vis1")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 
 // function for the vis1 scatterplot
function vis1_scatter() {
	// load csv file
  d3.csv("data/iris.csv").then((data) => { 

    // set constants for maximums
    const MAX_X1 = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });
    const MAX_Y1 = d3.max(data, (d) => { return parseInt(d.Petal_Length); });

    const X_SCALE1 = d3.scaleLinear() 
                        .domain([0, (MAX_X1 + 1)]) 
                        .range([0, VIS1_WIDTH]);

    const Y_SCALE1 = d3.scaleLinear() 
                        .domain([0, (MAX_Y1 + 1)]) 
                        .range([VIS1_HEIGHT, 0]);
    // create x axis for the graph the graph
    FRAME1.append("g") 
            .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS1_HEIGHT + MARGINS.top) + ")") 
            .call(d3.axisBottom(X_SCALE1).ticks(10)) 
            .attr("font-size", '12px');

    // create y axis for the graph
    FRAME1.append("g")
            .attr("transform", 
                "translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
            .call(d3.axisLeft(Y_SCALE1).ticks(10))
            .attr("font-size", "12px");

    const color = d3.scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica" ])
    .range([ "lightgreen", "orange", "lightblue"])

  	// Add points
    FRAME1.selectAll("points")  
          .data(data) 
          .enter()       
          .append("circle")  
            .attr("cx", (d) => { return (X_SCALE1(d.Sepal_Length) + MARGINS.left); }) 
            .attr("cy", (d) => { return (Y_SCALE1(d.Petal_Length) + MARGINS.top); }) 
            .attr("r", 5)
            .attr("fill", function(d) { return color(d.Species); })
            .attr("opacity", 0.75)
            .attr("class", "point");})}

vis1_scatter()


// Middle scatter plot
const FRAME2 = d3.select("#vis2")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 
 
function vis2_scatter() {
	// Open file
d3.csv("data/iris.csv").then((data) => { 

    const MAX_X2 = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });
    const MAX_Y2 = d3.max(data, (d) => { return parseInt(d.Petal_Width); });

    const X_SCALE2 = d3.scaleLinear() 
                        .domain([0, 8]) 
                        .range([0, VIS2_WIDTH]);

    const Y_SCALE2 = d3.scaleLinear() 
                        .domain([0, (MAX_Y2 + 1)]) 
                        .range([VIS2_HEIGHT, 0]);

    // Create x axis for the graph
    FRAME2.append("g") 
            .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS2_HEIGHT + MARGINS.top) + ")") 
            .call(d3.axisBottom(X_SCALE2).ticks(10)) 
            .attr("font-size", '12px');

    // Create y axis for the graph
    FRAME2.append("g")
            .attr("transform", 
                "translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
            .call(d3.axisLeft(Y_SCALE2).ticks(10))
            .attr("font-size", "12px");

    const color = d3.scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica" ])
    .range([ "lightgreen", "orange", "lightblue"])

  	// Add points
    FRAME2.selectAll("points")  
          .data(data) 
          .enter()       
          .append("circle")  
            .attr("cx", (d) => { return (X_SCALE2(d.Sepal_Width) + MARGINS.left); }) 
            .attr("cy", (d) => { return (Y_SCALE2(d.Petal_Width) + MARGINS.top); }) 
            .attr("r", 5)
            .attr("fill", function(d) { return color(d.Species); })
            .attr("opacity", 0.75)
            .attr("class", "point");})}
vis2_scatter()



