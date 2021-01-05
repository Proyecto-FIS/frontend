import axios from "axios";
import store from "../redux/store";
import logout from "../redux/actions/logout";

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

    logOut = () => {
        store.dispatch(logout());
    }
}

export default UsersService;
