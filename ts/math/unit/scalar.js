"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scalar = void 0;
const unit_1 = require("./unit");
class Scalar extends unit_1.Unit {
    val;
    constructor(val) {
        super();
        this.val = val;
    }
    get value() { return this.val; }
    set value(val) { this.val = val; }
    inv() {
        if (this.value == 0)
            throw new Error("Calling invert on a 0 value.");
        return new Scalar(1 / this.value);
    }
    pow(exponent) {
        this.value **= exponent;
    }
}
exports.Scalar = Scalar;
(function (Scalar) {
    Scalar.v = (val) => new Scalar(val);
})(Scalar || (exports.Scalar = Scalar = {}));
