class Validators {
    
    static StringLength(minLength, maxLength) {
        return v => {
            if(v.length < minLength) return `Debe tener al menos ${minLength} caracteres`;
            else if(v.length > maxLength) return `Debe tener al menos ${maxLength} caracteres`;
            return "";
        }
    }

    static CheckInteger() {
        return v => {
            if(!isNaN(v) && !isNaN(parseInt(v, 10))) return "";
            return "El valor solicitado debe ser un número";
        }
    }

    static TestRegex(regex) {
        return v => {
            if(!regex.test(v)) return `El valor no cumple el formato solicitado`;
            return "";
        }
    }

    static validate(validators, value) {
        return validators.reduce((ac, v) => ac === "" ? v(value) : ac, "");
    }
}

export default Validators;
