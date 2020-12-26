import axios from "axios";
import getAllDeliveries from "../redux/actions/getAllDeliveries";
import store from "../redux/store";

export class DeliveriesService {

    requestAllDeliveries = () => {
        axios.get("/api/deliveries")
            .then(response => store.dispatch(getAllDeliveries(response.data)))
    }

}

export default DeliveriesService;