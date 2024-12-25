import { Unit } from "./unit";

export class Length extends Unit<Length> {
	constructor(private length: number) { super(); }

	get value() { return this.length }
	set value(val: number) { this.length = val }

	mul(rhs: Length): Area;
	mul(rhs: Area): Volume;
	mul(rhs: Length | Area) {
		if (rhs instanceof Length)
			return new Area(this.value * rhs.value);
		return new Volume(this.value * rhs.value);
	}

	meter() {
		return this.value;
	}

	milli_meter() {
		return this.value * 1000;
	}

	kilo_meter() {
		return this.value / 1000;
	}
}

export class Area extends Unit<Area> {
	constructor(private area: number) { super() }

	get value() { return this.area }
	set value(val: number) { this.area = val }

	mul(rhs: Length) {
		return new Volume(this.value * rhs.value);
	}

	meter2() {
		return this.value
	}

	milli_meter2() {
		return this.value * 1000 ** 2;
	}

	kilo_meter2() {
		return this.value / 1000 ** 2;
	}
}

export class Volume extends Unit<Volume> {
	constructor(private volume: number) { super() }

	get value() { return this.volume }
	set value(val: number) { this.volume = val }

	meter3() {
		return this.value;
	}

	milli_meter3() {
		return this.value * 1000 ** 3;
	}

	kilo_meter3() {
		return this.value / 1000 ** 3;
	}
}

export namespace Length {
	export const m = (val: number) => new Length(val);
	export const mm = (val: number) => new Length(val * 1000);
	export const km = (val: number) => new Length(val / 1000);
}

export namespace Area {
	export const m2 = (val: number) => new Area(val);
	export const mm2 = (val: number) => new Area(val * 1000 ** 2);
	export const km2 = (val: number) => new Area(val / 1000 ** 2);
}

export namespace Volume {
	export const m3 = (val: number) => new Volume(val);
	export const mm3 = (val: number) => new Volume(val * 1000 ** 3);
	export const km3 = (val: number) => new Volume(val / 1000 ** 3);
}