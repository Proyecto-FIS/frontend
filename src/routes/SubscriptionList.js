import React, { Component } from "react";
import MainGrid from "../components/Common/MainGrid";
import Subscription from "../components/Sales/Subscription";
import SubscriptionNav from "../components/Sales/SubscriptionNav";
import { Grid, Card } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import { connect } from "react-redux";

const pageSize = 4;

class Subscription extends Component {

    render() {

        const { subscriptions } = this.props;

        const skeleton = Array.from({ length: pageSize }).map((v, i) => (
            <Grid key={i} item xs={12}>
                <Card><Skeleton aria-label="skeleton" variant="rect" height={"30vh"} /></Card>
            </Grid>
        ));

        const subscriptionList = subscriptions === null ? skeleton : subscriptions.map((v, i) => (
            <Grid key={i} item xs={12}>
                <Subscription subscription={v} />
            </Grid>
        ));

        return (
            <MainGrid container spacing={2} justify="flex-end">
                <Grid item>
                    <SubscriptionNav loaded={subscriptions !== null}
                        isEmpty={!subscriptions || subscriptions.length === 0} 
                        beforeTimestamp={subscriptions && subscriptions.length > 0 ? subscriptions[subscriptions.length - 1].timestamp : null}
                        pageSize={pageSize} />
                </Grid>
                <Grid item container spacing={2}>
                    {subscriptionList}
                </Grid>
            </MainGrid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        subscriptions: state.SubscriptionReducer.elements
    };
};

export default connect(mapStateToProps)(Subscription);
