import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {

    render() {
        const { component: Component, isAuthenticated, ...rest } = this.props;

        return (
            <Route 
                {...rest}
                render={ props => isAuthenticated ? <Component {...props} /> : <Redirect to="/" /> }
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.AuthReducer.account ? true : false
    }
}

export default connect(mapStateToProps)(PrivateRoute);
