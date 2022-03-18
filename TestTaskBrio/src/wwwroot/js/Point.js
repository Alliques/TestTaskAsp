var Point = /** @class */ (function () {
    function Point(context, x, y, radius) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    Point.prototype.drawPoint = function () {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.context.strokeStyle = '#5333ed';
        this.context.stroke();
    };
    return Point;
}());
export { Point };
//# sourceMappingURL=Point.js.map