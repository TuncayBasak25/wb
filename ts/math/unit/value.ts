export interface Value<Unit extends string> {
	unit: Unit;
	value: number;

	add(...rhsList: Value<Unit>[]): Value<Unit>;
	sub(...rhsList: Value<Unit>[]): Value<Unit>;

	scale(...rhsList: Value<"scalar">[]): Value<Unit>;

	add_mut<T>(this: T, ...rhsList: (Value<Unit> | number)[]): T & Value<Unit>;
	sub(...rhsList: Value<Unit>[]): Value<Unit>;

	scale(...rhsList: Value<"scalar">[]): Value<Unit>;
}

export namespace Value {
	export function compose<T, Unit extends string>(entity: T, unit: Unit, val: number): asserts entity is T & Value<Unit> {
		const self = entity as T & Value<Unit>;
		self.unit = unit;
		self.value = val;
		self.add = (...rhsList: (Value<Unit> | number)[]) => add(self, ...rhsList);
		self.add_mut = (...rhsList: (Value<Unit> | number)[]) => add_mut(self, ...rhsList);
	}

	export function create<Unit extends string>(unit: Unit, val: number) {
		const value = {};
		compose(value, unit, val);
		return (value);
	}

	function add<Name extends string>(lhs: Value<Name>, ...rhsList: (Value<Name> | number)[]) {
		let sum = lhs.value;
		for (const rhs of rhsList)
			sum += typeof rhs == "number" ? rhs : rhs.value;
		return (create(lhs.unit, sum));
	}

	function add_mut<T, Name extends string>(lhs: T & Value<Name>, ...rhsList: (Value<Name> | number)[]): T & Value<Name> {
		for (const rhs of rhsList)
			lhs.value += typeof rhs == "number" ? rhs : rhs.value;
		return lhs;
	}
}


let a = Value.create("angle", 5);

function add<T, n extends string>(ent: T, name: n): asserts ent is T & { [key in n]: number } {

}

add(a, "test");

a.add_mut(5).test = 5