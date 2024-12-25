type Add<A extends number, B extends number> =
  A extends 0
    ? B extends 0 ? 0 :
      B extends 1 ? 1 :
      B extends 2 ? 2 :
      B extends 3 ? 3 : never
    : A extends 1
    ? B extends 0 ? 1 :
      B extends 1 ? 2 :
      B extends 2 ? 3 :
      B extends 3 ? 4 : never
    : A extends 2
    ? B extends 0 ? 2 :
      B extends 1 ? 3 :
      B extends 2 ? 4 :
      B extends 3 ? 5 : never
    : A extends 3
    ? B extends 0 ? 3 :
      B extends 1 ? 4 :
      B extends 2 ? 5 :
      B extends 3 ? 6 : never
    : never;

type Sub<A extends number, B extends number> =
A extends 0
	? B extends 0 ? 0 :
	B extends 1 ? never :
	B extends 2 ? never :
	B extends 3 ? never : never
	: A extends 1
	? B extends 0 ? 1 :
	B extends 1 ? 0 :
	B extends 2 ? never :
	B extends 3 ? never : never
	: A extends 2
	? B extends 0 ? 2 :
	B extends 1 ? 1 :
	B extends 2 ? 0 :
	B extends 3 ? never : never
	: A extends 3
	? B extends 0 ? 3 :
	B extends 1 ? 2 :
	B extends 2 ? 1 :
	B extends 3 ? 0 : never
	: never;

class Value<T extends number = 0, L extends number = 0, M extends number = 0, A extends number = 0> {
	constructor(public value: number, private time: T = 0 as T, private length: L = 0 as L, private mass: M = 0 as M, private angle: A = 0 as A) {}

	add(...rhsList: (Value<T, L, M, A> | number)[]) {
		let sum = this.value;
		for (const rhs of rhsList)
			sum += typeof rhs == "number" ? rhs : rhs.value;
		return new Value<T, L, M, A>(sum, this.time, this.length, this.mass, this.angle);
	}

	sub(...rhsList: (Value<T, L, M, A> | number)[]) {
		let sum = this.value;
		for (const rhs of rhsList)
			sum -= typeof rhs == "number" ? rhs : rhs.value;
		return new Value<T, L, M, A>(sum, this.time, this.length, this.mass, this.angle);
	}

	mul<TT extends number, LL extends number, MM extends number, AA extends number>(rhs: Value<TT, LL, MM, AA>) {
		return new Value(this.value * rhs.value, (this.time + rhs.time) as Add<T, TT>, (this.length + rhs.length) as Add<L, LL>, (this.mass + rhs.mass) as Add<M, MM>, (this.angle + rhs.angle) as Add<A, AA>);
	}

	div<TT extends number, LL extends number, MM extends number, AA extends number>(rhs: Value<TT, LL, MM, AA>) {
		if (rhs.value == 0)
			throw new Error("Zero division!");
		return new Value(this.value / rhs.value, (this.time - rhs.time) as Sub<T, TT>, (this.length - rhs.length) as Sub<L, LL>, (this.mass - rhs.mass) as Sub<M, MM>, (this.angle - rhs.angle) as Sub<A, AA>);
	}
}

const a = new Value(5, 2);

const b = new Value(3, 2, 3);

const c = a.mul(b);

const d = c.div(a)