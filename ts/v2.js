"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetV2Pool = exports.V2 = exports.Vec2 = void 0;
class Vec2 {
    x;
    y;
    static new(x, y) {
        return new Vec2(x, y);
    }
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    add(...rhsList) {
        const temp = V2(0, 0);
        for (const rhs of rhsList) {
            temp.x += rhs.x;
            temp.y += rhs.y;
        }
        return temp;
    }
    sub(...rhsList) {
        const temp = V2(0, 0);
        for (const rhs of rhsList) {
            temp.x -= rhs.x;
            temp.y -= rhs.y;
        }
        return temp;
    }
    scale(scalar) {
        if (!isFinite(scalar))
            throw new Error("Scaling vector by NaN!");
        this.x *= scalar;
        this.y *= scalar;
    }
    rotate(scalar) {
    }
}
exports.Vec2 = Vec2;
const pool = [];
let count = 0;
function V2(x, y) {
    if (count == pool.length)
        pool.push(Vec2.new(x, y));
    return pool[count++].set(x, y);
}
exports.V2 = V2;
function resetV2Pool() {
    count = 0;
}
exports.resetV2Pool = resetV2Pool;
