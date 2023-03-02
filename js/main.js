// declare constants
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

// frame 1 for vis 1 (scatterplot)
const FRAME_1 = d3.select("#vis1") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

// frame 2 for vis 2 (scatterplot)
const FRAME_2 = d3.select("#vis2") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

// frame 3 for vis 3 (bar graph)
const FRAME_3 = d3.select("#vis3") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");
//read in data 
d3.csv("data/iris.csv").then((data) => {

  const MAX_X_LENGTH = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });
  const MAX_Y_LENGTH = d3.max(data, (d) => { return parseInt(d.Petal_Length); });

// creates scale for data 
  const X_SCALE_LENGTH = d3.scaleLinear() 
                           .domain([0, (MAX_X_LENGTH + 1)]) 
                           .range([0, VIS_WIDTH]); 


  const Y_SCALE_LENGTH = d3.scaleLinear() 
                           .domain([0, (MAX_Y_LENGTH + 1)])  
                           .range([VIS_HEIGHT, 0]); 

  let vis1_plot = FRAME_1.selectAll("points") 
      .data(data)
      .enter()
      .append("circle")
        .attr("class", "scatter")
        .attr("cx", (d) => { return (X_SCALE_LENGTH(d.Sepal_Length) + MARGINS.left); })
        .attr("cy", (d) => { return (Y_SCALE_LENGTH(d.Petal_Length) + MARGINS.bottom); })
        .attr("r", 4)
        .attr("fill", function (d) {
          if(d.Species === "setosa") {
            return "pink"
          } else if (d.Species === "versicolor") {
            return "lightblue"
          } else {
            return "lightgreen"
          }
        });

  // Add x and y axis to vis
  FRAME_1.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE_LENGTH).ticks(10)) 
          .attr("font-size", '12px'); 

  FRAME_1.append("g") 
        .attr("transform", "translate(" + MARGINS.bottom + 
              "," + (MARGINS.top) + ")") 
        .call(d3.axisLeft(Y_SCALE_LENGTH).ticks(10)) 
          .attr("font-size", '12px'); 

// constants for max values
  const MAX_X_WIDTH = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });
  const MAX_Y_WIDTH = d3.max(data, (d) => { return parseInt(d.Petal_Width); });

//establishes x and y scales using the maxes
  const X_SCALE_WIDTH = d3.scaleLinear() 
                          .domain([0, (MAX_X_WIDTH + 1)]) // add some padding  
                          .range([0, VIS_WIDTH]); 

  const Y_SCALE_WIDTH = d3.scaleLinear() 
                          .domain([0, (MAX_Y_WIDTH + 1)]) // add some padding  
                          .range([VIS_HEIGHT, 0]); 

  // plot vis2 points
  let vis2_plot = FRAME_2.selectAll("points") 
      .data(data)
      .enter()
      .append("circle")
        .attr("class", "scatter")
        .attr("cx", (d) => { return (X_SCALE_WIDTH(d.Sepal_Width) + MARGINS.left); })
        .attr("cy", (d) => { return (Y_SCALE_WIDTH(d.Petal_Width) + MARGINS.bottom); })
        .attr("r", 4)
        .attr("fill", function (d) {
          if(d.Species === "setosa") {
            return "pink"
          } else if (d.Species === "versicolor") {
            return "lightblue"
          } else {
            return "lightgreen"
          }
        });

  // Add x and y axis to vis
  FRAME_2.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE_WIDTH).ticks(10)) 
          .attr("font-size", '12px'); 

  FRAME_2.append("g") 
        .attr("transform", "translate(" + MARGINS.bottom + 
              "," + (MARGINS.top) + ")") 
        .call(d3.axisLeft(Y_SCALE_WIDTH).ticks(10)) 
          .attr("font-size", '12px'); 



    // creates scale functions 
    const X_SCALE_SPECIES = d3.scaleBand()   
                              .range([0, VIS_WIDTH])
                              .domain(data.map((d) => { return d.Species; }))
                              .padding(0.2); 

    const Y_SCALE_SPECIES = d3.scaleLinear()
                              .domain([0, 60])
                              .range([VIS_HEIGHT, 0]);

    // plot the bars with correct scales
    let vis3_plot = FRAME_3.selectAll("bars")  
        .data(data) // passed from .then  
        .enter()       
        .append("rect")
          .attr("class", "bar")  
          .attr("x", (d) => { return (X_SCALE_SPECIES(d.Species) + MARGINS.left); }) 
          .attr("y", 100) 
          .attr("width", X_SCALE_SPECIES.bandwidth())
          .attr("height", 250)
          .attr("fill", function (d) {
            if(d.Species === "setosa") {
            return "pink"
          } else if (d.Species === "versicolor") {
            return "lightblue"
          } else {
            return "lightgreen"
          }
          });

    // Add x and y axis to bar
    FRAME_3.append("g") 
          .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
          .call(d3.axisBottom(X_SCALE_SPECIES).ticks(3)) 
            .attr("font-size", '12px'); 

    FRAME_3.append("g") 
          .attr("transform", "translate(" + MARGINS.bottom + 
                "," + (MARGINS.top) + ")") 
          .call(d3.axisLeft(Y_SCALE_SPECIES).ticks(12)) 
            .attr("font-size", '12px'); 

// calls brush to vis2
  FRAME_2.call(d3.brush()                 
        .extent([[0,0], [FRAME_WIDTH, FRAME_HEIGHT]])
        .on("start brush", brush_selection)
      );

  function brush_selection(event) {
    let coords = event.selection;
    
    // checks that the brushed functions are highlighted
    vis1_plot.classed("selected", function(d){return highlight(coords, (X_SCALE_WIDTH(d.Sepal_Width)+MARGINS.left), (Y_SCALE_WIDTH(d.Petal_Width)+MARGINS.bottom)) });
    vis2_plot.classed("selected", function(d){return highlight(coords, (X_SCALE_WIDTH(d.Sepal_Width)+MARGINS.left), (Y_SCALE_WIDTH(d.Petal_Width)+MARGINS.bottom)) });
    vis3_plot.classed("selected", function(d){return highlight(coords, (X_SCALE_WIDTH(d.Sepal_Width)+MARGINS.left), (Y_SCALE_WIDTH(d.Petal_Width)+MARGINS.bottom)) });
  }

  // check whether a point is in the selection or not
  function highlight(coords, cx, cy) {
    let x0 = coords[0][0],
        x1 = coords[1][0],
        y0 = coords[0][1],
        y1 = coords[1][1];
    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
  }

});