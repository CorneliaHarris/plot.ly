// Read in samples.json using d3
d3.json("samples.json").then(function (data) {
    const samples = data.samples;
    const ids = samples.map(sample => sample.id);
    d3.select("#selDataset")
        .selectAll("option")
        .data(ids)
        .enter()
        .append("option")
        .html(d => d);
    const filtered = samples.filter(sample => sample.id === "940")[0];

    // Get x and y values for the graph

    const xVals = filtered.sample_values.slice(0, 10);
    const yVals = filtered.otu_ids.slice(0, 10).map(id => "OTU " + id);
    const hoverText = filtered.otu_labels.slice(0, 10);

    const barData = [
        {
            x: xVals,
            y: yVals,
            type: "bar",
            color: "blue",
            text: hoverText,
            orientation: "h"
        }
    ];

    Plotly.newPlot('bar', barData);

    var trace1 = {
        x: yVals,
        y: xVals,
        mode: 'markers',
        marker: {
            color: yVals,
            opacity: [1, 0.8, 0.6, 0.4],
            size: xVals
        },
        text: hoverText
    };

    var bubble = [trace1];

    var layout = {
        xaxis: {
            title: 'OTU ID',
            tickmode: "linear",
            tick0: 0,
            dtick: 500
        },

        showlegend: false,
        height: 600,
        width: 600
    };

    Plotly.newPlot('bubble', bubble, layout);
});

// create the function to get the necessary data
// read the json file to get data
{
    d3.json("samples.json").then(function (data) {
        // get the metadata info for the demographic panel
        var metadata = data.metadata;

        //console.log(metadata)

        var resultArray = metadata.filter(i => i.id == 940);
        console.log(resultArray)

        var result = resultArray[0];
        //select the panel with id of "sample-metadata"
        var sampleMetadata = d3.select("#sample-metadata");
        // clear any existing metadata
        sampleMetadata.html("");
        //add each key and value pair to the panel
        Object.entries(result).forEach(([key, value]) => {
            sampleMetadata.append("h6").text(`${key.toUpperCase()}: ${value}`);

        });
    });
}