google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Weight');

  $.getJSON('https://amislimyet.firebaseio.com/graphs/weight.json', function(weightData) {
    var keys = Object.keys(weightData).sort();
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      console.log((new Date(key+'T00:00:00')).toString());
      data.addRow([new Date(key+'T00:00:00'), weightData[key]]);
    }

    var options = {
      title: 'Weight over time'
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  });

}