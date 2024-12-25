const Units = ["Angle", "Length", "Time", "Mass"] as const;
type Unit = (typeof Units)[number];

type Operator = "mul" | "div" | "pow";
type OperationType<
	Op extends Operator,
	L extends Unit,
	R extends Unit,
	O extends Unit
> = {
	opr: Op,
	lhs: L,
	rhs: R,
	out: O
}
function operation<
	Op extends Operator,
	L extends Unit,
	R extends Unit,
	O extends Unit
>(opr: Op, lhs: L, rhs: R, out: O): OperationType<Op, L, R, O> {
	return {
		opr,
		lhs,
		rhs,
		out
	};
}
function compose<
	A extends Unit,
	B extends Unit,
	O extends Unit
>(a: A, b: B, o: O) {
	return [
		operation("mul", a, b, o),
		operation("mul", b, a, o),
		operation("div", o, a, b),
		operation("div", o, b, a),
	];
}
function power<
	Self extends Unit,
	Expo extends number,
	Outp extends Unit
>(self: Self, expo: Expo, outp: Outp) {

}
const Operations = [
	operation("pow", "Scalar", )
	...Units.map(unit => operation("mul", unit, "Scalar", unit)),
	...Units.map(unit => operation("mul", "Scalar", unit, unit)),
	...Units.map(unit => operation("div", unit, "Scalar", unit)),
	...Units.map(unit => operation("div", unit, unit, "Scalar")),
] as const;

type Operation = (typeof Operations)[number];

