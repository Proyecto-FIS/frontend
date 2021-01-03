import { Component } from "react";
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    Grid,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import DeliveriesService from "../../services/DeliveriesService";


const styles = (theme) => ({
    div: {
        display: 'flex',
        flexDirection: "row",
    },
    divImage:{
        position: 'relative',
        margin: '0 auto',
    },
    card: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    image:{
        minWidth: 200,
        maxWidth: 400,
        maxHeight: 500,
        [theme.breakpoints.down("xs")]: {
            minWidth: 150,
        },
    },
    content: {
        padding: 25,
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        maxWidth: 450,
    },
    input:{
        margin: '10px',
        width: '100%'
    },
    inputHalf:{
        margin: '10px',
        width: '45%'
    },
    inputInline: {
        display: "inline-flex",
        width: '100%'
    },
    button: {
        float: 'right'
    },
    errorText: {
        color: "#f44336",
        margin: 0,
        "font-size": "0.75rem",
        "margin-top": "3px",
        "text-align": "left",
        "font-family": "Roboto",
        "font-weight": 400,
        "line-height": 1.66,
        "letter-spacing":" 0.03333em",
    }
});

class NewDelivery extends Component {
    deliveriesService = new DeliveriesService();
    state = {
        name: '',
        surnames: '',
        address: '',
        errors: {},
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.deliveriesService.postDelivery({
            delivery:{
                name: this.state.name,
                surnames: this.state.surnames,
                address: this.state.address,
            },
            userToken: this.props.account.token
        });
    };

    render() {
        const {errors} = this.state;
        const {classes, newDelivery: {}} = this.props;

        return (
            <Card className={classes.card}>
                <div className={classes.div}>
                    <CardContent className={classes.content}>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </div>
            </Card>
        );
    }
}

NewDelivery.propTypes = {
    classes: PropTypes.object.isRequired,
    newDelivery: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    newDelivery: state.DeliveriesReducer.newDelivery,
    account: state.AuthReducer.account
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(NewDelivery));