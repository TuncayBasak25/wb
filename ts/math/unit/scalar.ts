import { Unit } from "./unit";

export class Scalar extends Unit<Scalar> {
	constructor(private val: number) { super(); }

	get value() { return this.val; }
	set value(val: number) { this.val = val; }

	inv() {
		if (this.value == 0)
			throw new Error("Calling invert on a 0 value.");
		return new Scalar(1 / this.value);
	}

	pow(exponent: number) {
		this.value **= exponent;
	}
}

export namespace Scalar {
	export const v = (val: number) => new Scalar(val);

	let a = v(5);
}