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

it("TestRegex", () => {
    const testRegex = Validators.TestRegex(/^dog/);
    expect(testRegex("dogstyle")).toBe("");
    expect(testRegex("dox")).toBe("El valor no cumple el formato solicitado");
});

it("Validator composition", () => {
    const validators = [Validators.TestRegex(/^test/), Validators.StringLength(5, 10)];
    expect(Validators.validate(validators, "tes")).toBe("El valor no cumple el formato solicitado");
    expect(Validators.validate(validators, "test")).toBe("Debe tener al menos 5 caracteres");
    expect(Validators.validate(validators, "testing")).toBe("");
});
