import React from "react";

import ToasterDetails from "./ToasterDetails";
import UsersService from "../../services/UsersService";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Divider } from '@material-ui/core';

import ProductSkeleton from "../Products/ProductSkeleton";

class ToastersList extends React.Component {


    componentDidMount(){ 
        UsersService.getAllToasters();
    }

    render(){
      const { toasters, loading } = this.props;

        return (
            <React.Fragment>
            <CssBaseline />
            <main>
              <div>
                <Container maxWidth="md">
                  <Typography component="h1" variant="h4" style={{ textAlign: 'center', marginTop: "24px",
                marginBottom: "8px"}}>
                    Tostadores
                  </Typography> 
                  <Divider variant="fullWidth" /><br/>
                </Container>
              </div>
              
              <Container maxWidth="md">
                <Grid container spacing={4}>
                {loading ? (
                  <ProductSkeleton/>
                  ) : (
                    toasters.map(toaster => (<ToasterDetails key={toaster._id} toaster={toaster}/>))
                  )
                }
                </Grid>
              </Container>
            </main>
          </React.Fragment>

        )
    }
    
}

const mapStateToProps = (state) => {
  return {
      toasters: state.ToastersReducer.toasters,
      loading: state.ToastersReducer.loading
  };
};

export default connect(mapStateToProps) (ToastersList);


