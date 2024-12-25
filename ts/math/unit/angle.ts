import { Unit } from "./unit";

export class Angle extends Unit<Angle> {
	constructor(private angle: number) { super(); }

	get value() { return this.angle }
	set value(val: number) { this.angle = val }

	rad() { return this.value }
	deg() { return this.value / Math.PI * 180 }
	turn() { return this.value / Math.PI / 2 }


	cos() { (Math.cos(this.value)) }
	sin() { Math.sin(this.value) }
	tan() { Math }
}

export namespace Angle {
	export const rad = (val: number) => new Angle(val);
	export const deg = (val: number) => new Angle(val / 180 * Math.PI);
	export const turn = (val: number) => new Angle(val * Math.PI * 2);
}