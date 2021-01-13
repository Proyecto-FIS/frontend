import Validators from "../../../utils/Validators";

const fields = {
  imageUrl: {
    label: "Imagen",
    name: "imageUrl",
    defaultValue: "",
    validators: [Validators.StringLength(1, 100)],
  },
  name: {
    label: "Nombre",
    name: "name",
    defaultValue: "",
    validators: [Validators.StringLength(1, 100)],
  },
  description: {
    label: "Descripción",
    name: "description",
    defaultValue: "",
    validators: [Validators.StringLength(25, 150)],
  },
  stock: {
    label: "Stock",
    name: "stock",
    defaultValue: "0",
    validators: [
      Validators.NotEmptyString(),
      Validators.CheckInteger(),
      Validators.CheckIntegerRange(0, 999),
    ],
  },
  grind: {
    label: "Molido",
    name: "grind",
    defaultValue: [],
    validators: [Validators.notEmptyArray()],
  },
  format: {
    label: "Formato",
    name: "format",
    defaultValue: [{ name: "Peso", price: "0" }],
    validators: [
      Validators.notEmptyArray(),
      Validators.validateArray([
        Validators.validateObjetctField("name", [
          Validators.StringLength(1, 100),
        ]),
        Validators.validateObjetctField("price", [
          Validators.StringLength(1, 100),
        ]),
      ]),
    ],
  },
};

export default fields;
