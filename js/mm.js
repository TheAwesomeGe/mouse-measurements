var points = [{x: 0, y: 0}]
var drawing = false;
var dpi = 0;


$(document).ready(function() {

    $('#poly').hide();
    $('#areap').hide();

    $('#poly').click(function(event) {
        $('#poly').hide();
        calculateArea();

        points.push(points[0]);

        drawLine(points[points.length - 2], points[points.length - 1]);

        addLength();
    });

    $('#setdpi').click(function(event) {
        dpi = parseInt($('#dpi').val());
        setMeasures();
    });
})

function calculateArea() { 
    var area = 0;
    var j = points.length - 1;

    for(i = 0; i < points.length; i++) {
        area += (points[j].x + points[i].x) * (points[j].y - points[i].y); 
        j = i;
    }

    area /= 2;

    area = Math.abs(area);

    $('#area').text(area);
    $('#areap').show();
}

function setMeasures() {
    var length = parseInt($('#length').text());
    var area = parseFloat($('#area').text());
    var cm = 0;
    var areacm = 0;

    if(dpi > 0) {
        cm = 2.54 * length / dpi;
        areacm = area / Math.pow(dpi, 2) * Math.pow(2.54, 2);
    }

    $('#lengthcm').text(cm);
    $('#areacm').text(areacm);


}

function reset() {
    points = [];
    $('#poly').hide();
    $('#areap').hide();
    clearBoard();
    $('#length').text("0");
}

function clearBoard() {
    $('#canvas')[0].getContext('2d').fillRect(0, 0, $('#canvas').width(), $('#canvas').height());
}

function drawLine(start, end) {
    var canvasContext = $('#canvas')[0].getContext('2d');

    canvasContext.beginPath();
    canvasContext.moveTo(start.x, start.y);
    canvasContext.lineTo(end.x, end.y);
    canvasContext.closePath();
    //boardContext.strokeStyle = '#000000';
    canvasContext.stroke();
}

function distance(start, end) {
    return Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
}

function addLength() {
    var length = parseInt($('#length').text());
    length += distance(points[points.length - 2], points[points.length - 1]);
    $('#length').text(length);
    setMeasures();
}

/*function getPositionOnCanvas(event) {
    var rect = $('#canvas')[0].getBoundingClientRect();
    return {
        x: event.x - rect.left,
        y: event.y - rect.top
    };
}*/

function setUpCanvas() {
    var canvas = $('#canvas');
    canvas.attr('height', $('#canvasContainer').height());
    canvas.attr('width', $('#canvasContainer').width());
    var canvasContext = canvas[0].getContext('2d');
    var canvasTop = canvas[0].getBoundingClientRect().top
    var canvasLeft = canvas[0].getBoundingClientRect().left

    canvasContext.fillStyle = '#ffffff';
    canvasContext.strokeStyle = '#000000';

    canvas.mousedown(function(event) {
        reset();
        drawing = true;
        points.push({
            x: event.clientX - canvas.offset().left,//parseInt(event.clientX) - canvasLeft, 
            y: event.clientY - canvas.offset().top //parseInt(event.clientY) - canvasTop
        });
    });

    canvas.mousemove(function(event) {
        if(drawing) {
            points.push({
                x: event.clientX - canvas.offset().left,//parseInt(event.clientX) - canvasLeft, 
                y: event.clientY - canvas.offset().top//parseInt(event.clientY) - canvasTop
            });

            drawLine(points[points.length - 2], points[points.length - 1]);

            addLength();
        }
    });

    canvas.mouseup(function(event) {
        drawing = false;
        $('#poly').show();
    });

}