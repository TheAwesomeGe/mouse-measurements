var points = []

function reset() {
    points = [];
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
    $('#length').text(length)
}

function setUpCanvas() {
    var canvas = $('#canvas');
    var canvasContext = canvas[0].getContext('2d');
    var canvasTop = canvas[0].getBoundingClientRect().top
    var canvasLeft = canvas[0].getBoundingClientRect().left

    canvasContext.fillStyle = '#ffffff';
    canvasContext.strokeStyle = '#000000';

    canvas.hammer().on('dragstart', function(event) {
        reset();
        console.log(event);
        points.push({x: parseInt(event.gesture.center.pageX) - canvasLeft, y: parseInt(event.gesture.center.pageY) - canvasTop});
    });

    canvas.hammer().on('drag', function(event) {
        points.push({x: parseInt(event.gesture.center.pageX), y: parseInt(event.gesture.center.pageY)});

        drawLine(points[points.length - 2], points[points.length - 1]);

        addLength()
    });

    /*document.ontouchmove = function(event){
        event.preventDefault();
    }*/
}

//setUpCanvas()