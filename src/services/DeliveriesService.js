import axios from "axios";
import getAllDeliveries from "../redux/actions/getAllDeliveries";
import store from "../redux/store";

export class DeliveriesService {

    requestAllDeliveries = (userId) => {
        axios.get("/api/deliveries", {params: { userId: userId }})
            .then(response => store.dispatch(getAllDeliveries(response.data)))
    }

}

export default DeliveriesService;
