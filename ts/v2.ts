export class Vec2 {
	static new(x: number, y: number): Vec2 {
		return new Vec2(x, y);
	}

	constructor(public x: number, public y: number) {}

	set(x: number, y: number): this {
		this.x = x;
		this.y = y;
		return this;
	}

	add(...rhsList: Vec2[]) {
		const temp = V2(0, 0);
		for (const rhs of rhsList) {
			temp.x += rhs.x;
			temp.y += rhs.y;
		}
		return temp;
	}

	sub(...rhsList: Vec2[]) {
		const temp = V2(0, 0);
		for (const rhs of rhsList) {
			temp.x -= rhs.x;
			temp.y -= rhs.y;
		}
		return temp;
	}

	scale(scalar: number) {
		if (!isFinite(scalar))
			throw new Error("Scaling vector by NaN!");
		this.x *= scalar;
		this.y *= scalar;
	}

	rotate(scalar: number) {
		
	}
}


const pool: Vec2[] = [];
let count = 0;
export function V2(x: number, y: number) {
	if (count == pool.length)
		pool.push(Vec2.new(x, y));
	return pool[count++].set(x, y);
}

export function resetV2Pool() {
	count = 0;
}