"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Space = exports.Plane = exports.Length = void 0;
const unit_1 = require("./unit");
class Length extends unit_1.Unit {
    length;
    constructor(length) {
        super();
        this.length = length;
    }
    get value() { return this.length; }
    set value(val) { this.length = val; }
    mul(rhs) {
        if (rhs instanceof Length)
            return new Plane(this.value * rhs.value);
        return new Space(this.value * rhs.value);
    }
}
exports.Length = Length;
class Plane extends unit_1.Unit {
    length2;
    constructor(length2) {
        super();
        this.length2 = length2;
    }
    get value() { return this.length2; }
    set value(val) { this.length2 = val; }
    mul(rhs) {
        return new Space(this.value * rhs.value);
    }
}
exports.Plane = Plane;
class Space extends unit_1.Unit {
    length3;
    constructor(length3) {
        super();
        this.length3 = length3;
    }
    get value() { return this.length3; }
    set value(val) { this.length3 = val; }
}
exports.Space = Space;
(function (Length) {
    Length.m = (val) => new Length(val);
    Length.mm = (val) => new Length(val * 1000);
    Length.km = (val) => new Length(val / 1000);
})(Length || (exports.Length = Length = {}));
(function (Plane) {
    Plane.m2 = (val) => new Plane(val);
    Plane.mm2 = (val) => new Plane(val * 1000 ** 2);
    Plane.km2 = (val) => new Plane(val / 1000 ** 2);
})(Plane || (exports.Plane = Plane = {}));
(function (Space) {
    Space.m3 = (val) => new Space(val);
    Space.mm3 = (val) => new Space(val * 1000 ** 3);
    Space.km3 = (val) => new Space(val / 1000 ** 3);
})(Space || (exports.Space = Space = {}));
