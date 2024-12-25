"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unit = void 0;
class Unit {
    add(...rhsList) {
        let sum = this.value;
        for (const rhs of rhsList)
            sum += rhs.value;
        return new this.constructor(sum);
    }
}
exports.Unit = Unit;
