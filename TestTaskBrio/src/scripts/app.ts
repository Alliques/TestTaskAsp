﻿import { Point } from "./Point.js"
import { MovingObject, Direction } from "./MovingObject.js"


var wrapper = document.getElementById("canvas-wrapper")
var canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = wrapper.offsetWidth;
canvas.height = wrapper.offsetHeight;
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
let direction: number; //направление
let pointsArray: Point[] = [];
let currentTarget: Point;
let movingObject: MovingObject;
let speed = 200;
let lastTarget: Point;
let lastCreatedPoint: Point = null;


canvas.onmousedown = function (event) {
    var point = new Point(ctx, event.offsetX, event.offsetY, 10);
    pointsArray.push(point);

    if (pointsArray.length>1) {
        pointsArray[pointsArray.length - 2].nextPoint = point;
        point.previouspoint = pointsArray[pointsArray.length - 2];
        //currentTarget.previouspoint = currentTarget;
        //currentTarget.nextPoint = point;
        //currentTarget = point;
    }

    if (pointsArray.length == 2) {
        currentTarget = point; // задать только один раз и только здесь
        movingObject = new MovingObject(ctx, point.previouspoint.x, point.previouspoint.y, 8, 8);
        movingObject.draw();
        update();
    }
    
    point.drawPoint();
}

function StartMove() {
    if (Math.abs(movingObject.x - currentTarget.x) < movingObject.dx && Math.abs(movingObject.y - currentTarget.y) < movingObject.dy)
    { //когда достигли цели
        movingObject.x = currentTarget.x;
        movingObject.y = currentTarget.y;

        //то след. таргет
        changeDirection();
        chngeTarget();

    }
    else { //считаем след. кооординату
        const opp = currentTarget.y - movingObject.y;
        const adj = currentTarget.x - movingObject.x;
        const angle = Math.atan2(opp, adj);
        movingObject.x += Math.cos(angle) * movingObject.dx;
        movingObject.y += Math.sin(angle) * movingObject.dy;
    }
}

function changeDirection() {
    if (currentTarget == pointsArray[pointsArray.length - 1]) {
        movingObject.direction = Direction.back;
    }
    if (currentTarget == pointsArray[0]) {
        movingObject.direction = Direction.forward;
    }
}

function chngeTarget() {
    switch (movingObject.direction) {
        case Direction.forward:
            currentTarget = currentTarget.nextPoint;
            break;
        case Direction.back:
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


//function sendPontToListeners() {
//    const hubConnection = new signalR.HubConnectionBuilder()
//        .withUrl("/")
//        .build();
//}