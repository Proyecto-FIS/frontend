import React, { Component } from "react";
import { connect } from "react-redux";
import sampleAction from "../../redux/actions/sampleAction";

class Sample extends Component {

    constructor(props) {
        super(props);
        props.sampleAction();   // Trigger action
    }

    render() {
        const { sample } = this.props;
        return (
            <h1>Hello {sample}</h1>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        // Return state props you want
        sample: state.sampleReducer
    }
};

const mapDispatchToProps = {
    sampleAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Sample);
