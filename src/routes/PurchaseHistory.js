import React, { Component } from "react";
import MainGrid from "../components/Common/MainGrid";
import PurchaseEntry from "../components/Sales/PurchaseEntry";
import PurchaseHistoryNav from "../components/Sales/PurchaseHistoryNav";
import { Grid, Card } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import { connect } from "react-redux";

const pageSize = 4;

class PurchaseHistory extends Component {

    render() {

        const { purchases } = this.props;

        const skeleton = Array.from({ length: pageSize }).map((v, i) => (
            <Grid key={i} item xs={12}>
                <Card><Skeleton aria-label="skeleton" variant="rect" height={"30vh"} /></Card>
            </Grid>
        ));

        const purchaseList = purchases === null ? skeleton : purchases.map((v, i) => (
            <Grid key={i} item xs={12}>
                <PurchaseEntry purchase={v} />
            </Grid>
        ));

        return (
            <MainGrid container spacing={2} justify="flex-end">
                <Grid item>
                    <PurchaseHistoryNav loaded={purchases !== null}
                        isEmpty={!purchases || purchases.length === 0} 
                        beforeTimestamp={purchases && purchases.length > 0 ? purchases[purchases.length - 1].timestamp : null}
                        pageSize={pageSize} />
                </Grid>
                <Grid item container spacing={2}>
                    {purchaseList}
                </Grid>
            </MainGrid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        purchases: state.PurchaseHistoryReducer.elements
    };
};

export default connect(mapStateToProps)(PurchaseHistory);
