class Validators {

    static StringLength(minLength, maxLength) {
        return (v) => {
            if (v.length < minLength)
                return `Debe tener al menos ${minLength} caracteres`;
            else if (v.length > maxLength)
                return `Debe tener menos de ${maxLength} caracteres`;
            return "";
        };
    }
    
    static NotEmptyString() {
        return (v) => {
            if (v === "")
                return "El campo esta vacío"
            else
                return ""
        }
    }

    static CheckInteger() {
        return (v) => {
            if (!isNaN(v) && !isNaN(parseInt(v, 10))) return "";
            return "El valor solicitado debe ser un número";
        };
    }

    static CheckIntegerRange(min, max) {
        return (v) => {
            if (v < max && v >= min) return "";
            return `El valor debe estar entre ${min} y ${max}`;
        };
    }

    static CheckDouble() {
        return (v) => {
            if (!isNaN(v) && typeof v == "number") return "";
            return "El valor solicitado debe ser un número";
        };
    }

    static TestRegex(regex) {
        return (v) => {
            if (!regex.test(v)) return `El valor no cumple el formato solicitado`;
            return "";
        };
    }

    static notEmptyArray() {
        return (v) => {
            if (v.length === 0) return "No hay elementos";
            return "";
        };
    }

    static validateArray(ValidatorArray) {
        return (v) => {
            for (let i = 0; i < v.length; i++) {
                const validation = Validators.validate(ValidatorArray, v[i]);
                if (validation.length !== 0) return validation;
            }
            return "";
        };
    }
    static validateObjetctField(propName, ValidatorArray) {
        return (v) => {
            if (v.hasOwnProperty(propName)) {
                return Validators.validate(ValidatorArray, v[propName]);
            } else {
                return `No existe el campo ${propName}`;
            }
        };
    }

    static validate(validators, value) {
        return validators.reduce((ac, v) => (ac === "" ? v(value) : ac), "");
    }
}

export default Validators;
