
console.log("hi");
const options = {
	method: 'GET'}


fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', options)
	.then(response => response.json())
	.then(data => {
    const dataset = data.data;
    console.log(dataset)
    const w = 1000;
    const h = 500;
    const padding = 60;
    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
    const xScale = d3.scaleLinear()
                      .domain([d3.min(dataset, d => d[0]), d3.max(dataset, d => d[0])])
                      .range([padding, w - padding]);
                      
    const yScale = d3.scaleLinear()
                      .domain([0, d3.max(dataset, d => d[1])])
                      .range([h - padding, padding]);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    svg.append("g")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);
    svg.append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", (d, i) => {  xScale(d[0])} )
        .attr("y", (d, i) => yScale(d[1]))
        .attr("width", w / dataset.length - padding)
        .attr("height", (d, i) => h - padding - yScale(d[1]))
        .attr("fill", "navy")
        .attr("data-date", (d, i) => d[0])
        .attr("data-gdp", (d, i) => d[1])
        .on("mouseover", (d, i) => {
          tooltip.transition()
                  .duration(200)
                  .style("opacity", .9);
          tooltip.html(d[0] + "<br/>" + d[1])
                  .attr("data-date", d[0])
                  .style("left", (d3.event.pageX + 10) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", (d, i) => {
          tooltip.transition()
                  .duration(500)
                  .style("opacity", 0);
        });
    const tooltip = d3.select("body")
                      .append("div")
                      .attr("id", "tooltip")
                      .style("opacity", 0);


      })
	//.catch(err => console.error(err));