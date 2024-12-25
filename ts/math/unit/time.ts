import { Unit } from "./unit";

export class Time extends Unit<Time> {
	constructor(private time: number) { super() };

	get value() { return this.time }
	set value(val: number) { this.time = val }

	second() { return this.value;}
	milli_second() { return this.value * 1000 }
	micro_second() { return this.value * 1000 ** 2 }
	nano_second() { return this.value * 1000 ** 3 }
}

export namespace Time {
	export const second = (val: number) => new Time(val);
	export const milli_second = (val: number) => new Time(val * 1000);
	export const micro_second = (val: number) => new Time(val * 1000 ** 2);
	export const nano_second = (val: number) => new Time(val * 1000 ** 3);
}