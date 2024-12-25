"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unit_1 = require("./unit");
class Angle extends unit_1.Unit {
    angle;
    constructor(angle) {
        super();
        this.angle = angle;
    }
    get value() { return this.angle; }
    ;
    set value(val) { this.angle = val; }
    ;
}
class Length extends unit_1.Unit {
    length;
    constructor(length) {
        super();
        this.length = length;
    }
    get value() { return this.length; }
    ;
    set value(val) { this.length = val; }
    ;
}
let a = new Angle(5);
let b = new Length(3);
let d = new Angle(5);
let c = a.add(d);
console.log(c);
console.log(b);
