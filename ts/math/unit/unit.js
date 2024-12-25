"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unit = void 0;
class Unit {
    add(...rhsList) {
        let sum = this.value;
        for (const rhs of rhsList) {
            if (typeof rhs == "number")
                sum += rhs;
            else
                sum += rhs.value;
        }
        return new this.constructor(sum);
    }
    sub(...rhsList) {
        let sum = this.value;
        for (const rhs of rhsList) {
            if (typeof rhs == "number")
                sum -= rhs;
            else
                sum -= rhs.value;
        }
        return new this.constructor(sum);
    }
    scale(...rhsList) {
        let factor = this.value;
        for (const rhs of rhsList) {
            if (typeof rhs == "number")
                factor *= rhs;
            else
                factor *= rhs.value;
        }
        return new this.constructor(factor);
    }
}
exports.Unit = Unit;
