"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point_js_1 = require("./Point.js");
var MovingObject_js_1 = require("./MovingObject.js");
var wrapper = document.getElementById("canvas-wrapper");
var canvas = document.getElementById("canvas");
canvas.width = wrapper.offsetWidth;
canvas.height = wrapper.offsetHeight;
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
var direction; //направление
var pointsArray = [];
var currentTarget;
var movingObject;
var speed = 200;
var lastTarget;
var lastCreatedPoint = null;
canvas.onmousedown = function (event) {
    var point = new Point_js_1.Point(ctx, event.offsetX, event.offsetY, 10);
    pointsArray.push(point);
    if (pointsArray.length > 1) {
        pointsArray[pointsArray.length - 2].nextPoint = point;
        point.previouspoint = pointsArray[pointsArray.length - 2];
        //currentTarget.previouspoint = currentTarget;
        //currentTarget.nextPoint = point;
        //currentTarget = point;
    }
    if (pointsArray.length == 2) {
        currentTarget = point; // задать только один раз и только здесь
        movingObject = new MovingObject_js_1.MovingObject(ctx, point.previouspoint.x, point.previouspoint.y, 8, 8);
        movingObject.draw();
        update();
    }
    point.drawPoint();
};
function StartMove() {
    if (Math.abs(movingObject.x - currentTarget.x) < movingObject.dx && Math.abs(movingObject.y - currentTarget.y) < movingObject.dy) { //когда достигли цели
        movingObject.x = currentTarget.x;
        movingObject.y = currentTarget.y;
        //то след. таргет
        changeDirection();
        chngeTarget();
    }
    else { //считаем след. кооординату
        var opp = currentTarget.y - movingObject.y;
        var adj = currentTarget.x - movingObject.x;
        var angle = Math.atan2(opp, adj);
        movingObject.x += Math.cos(angle) * movingObject.dx;
        movingObject.y += Math.sin(angle) * movingObject.dy;
    }
}
function changeDirection() {
    if (currentTarget == pointsArray[pointsArray.length - 1]) {
        movingObject.direction = MovingObject_js_1.Direction.back;
    }
    if (currentTarget == pointsArray[0]) {
        movingObject.direction = MovingObject_js_1.Direction.forward;
    }
}
function chngeTarget() {
    switch (movingObject.direction) {
        case MovingObject_js_1.Direction.forward:
            currentTarget = currentTarget.nextPoint;
            break;
        case MovingObject_js_1.Direction.back:
            currentTarget = currentTarget.previouspoint;
            break;
        default:
    }
}
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movingObject.draw();
    for (var i = 0; i < pointsArray.length; i++) {
        pointsArray[i].drawPoint();
    }
    StartMove();
    requestAnimationFrame(update);
}
//# sourceMappingURL=app.js.map