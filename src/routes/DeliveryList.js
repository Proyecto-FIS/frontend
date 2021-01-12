import React, { Component } from "react";
import MainGrid from "../components/Common/MainGrid";
import Delivery from "../components/Deliveries/Delivery";
import { Grid, Card } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import DeliveryService from "../services/DeliveryService";
import { connect } from "react-redux";
import setDelivery from "../redux/actions/Delivery/setDelivery";


class DeliveryList extends Component {

    constructor(props) {
        super(props);
        this.props.setDelivery(null);
        DeliveryService.requestDeliveries();
    }

    render() {

        const { deliveries } = this.props;

        const skeleton = Array.from({ length: 8 }).map((v, i) => (
            <Grid key={i} item xs={4}>
                <Card><Skeleton aria-label="skeleton" variant="rect" height={"30vh"} /></Card>
            </Grid>
        ));

        const deliveryList = deliveries === null ? skeleton : deliveries.map((v, i) => (
            <Grid key={i} item xs={4}>
                <Delivery delivery={v} />
            </Grid>
        ));

        return (
            <MainGrid container spacing={2} justify="flex-end">
                <Grid item container spacing={4}>
                    {deliveryList}
                </Grid>
            </MainGrid>
        );
    }
}

const mapDispatchToProps = {
    setDelivery
};

const mapStateToProps = (state) => {
    return {
        deliveries: state.DeliveriesReducer.elements
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryList);