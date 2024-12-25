import { Scalar } from "./scalar";

const UNITS = ["Scalar", "Angle", "Length", "Time", "Mass", "Area", "Volume"] as const;
type Unit = (typeof UNITS)[number];

type Operator = "mul" | "div";
type Operation = { op: Operator, lhs: Unit, rhs: Unit, output: Unit};

const operations: Operation[] = [];

function associateUnits(lhs: Unit, rhs: Unit, output: Unit) {
	operations.push({ op: "mul", lhs, rhs, output });
	operations.push({ op: "mul", lhs: rhs, rhs: lhs, output });
	operations.push({ op: "div", lhs: output, rhs: rhs, output: lhs });
}


function performOperation<T extends Unit>(op: Operator, lhs: Value<Unit>, rhs: Value<Unit>): Value<T> {
	for (const operation of operations)
	{
		if (op == operation.op && lhs.unit == operation.lhs && rhs.unit == operation.rhs)
		{
			switch (op) {
				case "mul": return new Value(operation.output as T, lhs.value * rhs.value);
				case "div": return new Value(operation.output as T, lhs.value / rhs.value);
			}
		}
	}
	throw new Error("Unregistred operation!");//This should never happen unless we break into complier with assertions...
}

for (const base of UNITS)
	defineDivision(base, base, "Scalar");

defineMultiplication("Length", "Length", "Area");
defineMultiplication("Area", "Length", "Volume");

const powers: [Unit, number, Unit][] = [
	["Length", 2, "Area"],
	["Length", 3, "Volume"],
]

type Literal<Unit extends Unit> = Value<Unit> | number

export class Value<Unit extends Unit> {
	
	constructor(readonly unit: Unit, public value: number) {}

	add(...rhsList: Literal<Unit>[]) {
		let sum = this.value;
		for (const rhs of rhsList)
			sum += typeof rhs == "number" ? rhs : rhs.value;
		return new Value<Unit>(this.unit, sum);
	}

	sub(...rhsList: Literal<Unit>[]) {
		let sum = this.value;
		for (const rhs of rhsList)
			sum -= typeof rhs == "number" ? rhs : rhs.value;
		return new Value<Unit>(this.unit, sum);
	}

	scale<T extends Unit>(this: Value<T>, ...rhsList: Literal<"Scalar">[]) {
		let factor = this.value;
		for (const rhs of rhsList)
			factor *= typeof rhs == "number" ? rhs : rhs.value;
		return new Value<T>(this.unit, factor);
	}

	mul(this: Value<"Length">, rhs: Value<"Length">): Value<"Area">;
	mul(this: Value<"Area">, rhs: Value<"Length">): Value<"Volume">;
	mul(this: Value<"Length">, rhs: Value<"Area">): Value<"Volume">;
	mul(this: Value<Unit>, rhs: Value<Unit>): Value<Unit> {
		return performOperation("mul", this, rhs);
	}

	div(this: Value<"Length">, rhs: Value<"Length">);
	div(this: Value<Unit>, rhs: Value<Unit>): Value<Unit> {
		if (rhs.value == 0)
			throw new Error("Zero division!");
		return performOperation("div", this, rhs);
	}

	pow(this: Value<"Length">, exponent: 2): Value<"Area">;
	pow(this: Value<"Length">, exponent: 3): Value<"Volume">;
	pow(this: Value<"Scalar">, exponent: Literal<"Scalar">): Value<"Scalar">;
	pow(this: Value<Unit>, exponent: Literal<"Scalar">): Value<Unit> {
		if (this.unit == "Scalar")
			return new Value("Scalar", this.value ** (typeof exponent == "number" ? exponent : exponent.value));
		if (typeof exponent != "number")
			throw new Error("Cannot power a unit to a scalar!");//Should never happen...
		for (const [unit, exp, output] of powers)
			if (this.unit == unit && exponent == exp)
				return new Value(output, this.value ** exponent);
		throw new Error("Power not defined!");
	}
}

const width = new Value("Length", 5);
const height = new Value("Length", 5);

const surface = width.mul(height);

const length = new Value("Length", 10);
const volume = surface.mul(length);
