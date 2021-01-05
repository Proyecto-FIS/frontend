

import { Component } from "react";
import {
    Grid,
} from "@material-ui/core";

class SuccessPayment extends Component {
    render() {
        return (
            <Grid key={_id} item sm={4} xs={12}>
                <h1>Thanks for your order!</h1>
                <p>
                    We appreciate your business!
                    If you have any questions, please email
                    <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
            </Grid>
        );
    }
}

export default SuccessPayment;
