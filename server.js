var serialport = require('serialport');
var portName = '/dev/tty.usbmodem1411';
var sp = new serialport.SerialPort(portName, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline("\r\n")
});

var CHART_WIDTH = 500,
    CHART_HEIGHT = 300;
    
var widthScale = d3.scale.linear()
  // Объявляем исходный диапазон
  .domain([
    // Определяем минимальное...
    d3.min(data, function(d, i) {``
      return d;
    }),
    // ...и максимальное знaчения массива данных
    d3.max(data, function(d, i) {
      return d;
    })
  ])
  // Результирующий диапазон — от нуля до ширины диаграммы
  .range([0, CHART_WIDTH])
  // Начало и конeц диапазона — «красивые» значения
  .nice();

sp.on('data', function(input) {
    console.log(input);
    var chartArea = d3
			    	.select('body')
			    	.append('div')
			    	.classed('chartArea', true);

    chartArea
	    .selectAll('div')
	    .data(input)
	    .enter()
	    .append('div')
	    .classed('barArea', true)
	    .style('background-color', 'hsl(240,50%,75%)')
		.style('height', '20px')
		.style('margin', '2px 0px')
		.style('width', function(d,i) { return d + 'px'; } )
		.text(String);
});