/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// 粒子
var Particle = function (position, mass) {
    this.p = position;
    this.m = mass;  //质量（这儿暂时不需要）
    this.v = new Point(0, 0); // velocity 速率
    this.f = new Point(0, 0); // force 力量
};
Particle.prototype.applyForce = function (force) {
    this.f = this.f.add(force.divide(this.m));
};

// 弹簧
var Spring = function (point1, point2, length, k)
{
    this.point1 = point1; //起始点
    this.point2 = point2; //终止点
    this.length = length; // 长度
    this.k = k;           // 劲度系数
};
// 点
var Point = function (x, y) {
    if (x && x.hasOwnProperty('y')) {
        y = x.y;
        x = x.x;
    }
    this.x = x;
    this.y = y;
}
Point.prototype = {
    exploded: function () {
        return (isNaN(this.x) || isNaN(this.y))
    },
    add: function (v2) {
        return new Point(this.x + v2.x, this.y + v2.y);
    },
    subtract: function (v2) {
        return new Point(this.x - v2.x, this.y - v2.y);
    },
    multiply: function (n) {
        return new Point(this.x * n, this.y * n);
    },
    divide: function (n) {
        return new Point(this.x / n, this.y / n);
    },
    magnitude: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    normal: function () {
        return new Point(-this.y, this.x);
    },
    normalize: function () {
        return this.divide(this.magnitude());
    }
}
