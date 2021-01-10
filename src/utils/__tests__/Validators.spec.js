import Validators from "../Validators";

it("StringLength", () => {
  const stringLength = Validators.StringLength(3, 5);
  expect(stringLength("h")).toBe("Debe tener al menos 3 caracteres");
  expect(stringLength("hhhhhh")).toBe("Debe tener menos de 5 caracteres");
  expect(stringLength("hhhh")).toBe("");
});

it("CheckInteger", () => {
  const checkInteger = Validators.CheckInteger();
  expect(checkInteger("10")).toBe("");
  expect(checkInteger(10)).toBe("");
  expect(checkInteger("text")).toBe("El valor solicitado debe ser un número");
});

it("CheckDouble", () => {
  const checkDouble = Validators.CheckDouble();
  expect(checkDouble("10.0")).toBe("El valor solicitado debe ser un número");
  expect(checkDouble(10.0)).toBe("");
  expect(checkDouble("text")).toBe("El valor solicitado debe ser un número");
});

it("TestRegex", () => {
  const testRegex = Validators.TestRegex(/^dog/);
  expect(testRegex("dogstyle")).toBe("");
  expect(testRegex("dox")).toBe("El valor no cumple el formato solicitado");
});

it("Validator composition", () => {
  const validators = [
    Validators.TestRegex(/^test/),
    Validators.StringLength(5, 10),
  ];
  expect(Validators.validate(validators, "tes")).toBe(
    "El valor no cumple el formato solicitado"
  );
  expect(Validators.validate(validators, "test")).toBe(
    "Debe tener al menos 5 caracteres"
  );
  expect(Validators.validate(validators, "testing")).toBe("");
});

it("NotEmptyArray", () => {
  const notEmptyArray = Validators.notEmptyArray();
  expect(notEmptyArray(["el", "ol"])).toBe("");
  expect(notEmptyArray([])).toBe("No hay elementos");
});

it("CheckIntegerRange", () => {
  const checkIntegerRange = Validators.CheckIntegerRange(0, 10);
  expect(checkIntegerRange(7)).toBe("");
  expect(checkIntegerRange(15)).toBe("El valor debe estar entre 0 y 10");
  expect(checkIntegerRange(0)).toBe("");
  expect(checkIntegerRange(-2)).toBe("El valor debe estar entre 0 y 10");
});

it("validateArray", () => {
  const checkIntegerRange = Validators.CheckIntegerRange(0, 10);
  const validateArray = Validators.validateArray([checkIntegerRange]);
  expect(validateArray([1, 2, 3])).toBe("");
  expect(validateArray([1, 2, -3])).toBe("El valor debe estar entre 0 y 10");
});

it("validateObjetctField", () => {
  const field = "name";
  const stringLength = Validators.StringLength(3, 5);
  const validateObjetctField = Validators.validateObjetctField(field, [
    stringLength,
  ]);

  expect(validateObjetctField({ name: "test" })).toBe("");
  expect(validateObjetctField({ name: "testtoolong" })).toBe(
    "Debe tener menos de 5 caracteres"
  );
  expect(validateObjetctField({})).toBe(`No existe el campo ${field}`);
});
