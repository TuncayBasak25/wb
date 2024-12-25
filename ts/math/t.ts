import { Unit } from "./unit/unit"

class Angle extends Unit<Angle> {
	constructor(private angle: number) {super()}

	get value() { return this.angle };
	set value(val: number) { this.angle = val};
}

class Length extends Unit<Length> {
	constructor(private length: number) {super()}

	get value() { return this.length };
	set value(val: number) { this.length = val};
}

let a = new Angle(5);

let b = new Length(3);

let d = new Angle(5);

let c = a.add(d);

console.log(c);
console.log(b);
