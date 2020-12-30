import axios from "axios";

export class UsersService {

    static getAllRoasters() {
        return axios.get("/api/toasters")
    }

    getRoaster = (roasterId) => {
        return axios.get("/api/toasters", { roasterId })
    }

    getCustomer = (customerId) => {
        return axios.get("/api/customers", { customerId })
    }
}

export default UsersService;
