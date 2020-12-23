import React from "react";
import { Grid } from "@material-ui/core";
import Delivery from "./Delivery";
import DeliveriesService from "../../services/DeliveriesService";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class DeliveriesList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            deliveries: [] }
    }

    componentDidMount(){ 
        DeliveriesService.getAllDeliveries().then(
            (result) => {
                this.setState({
                    deliveries: result.data
                })
            }
        )
    }

    render(){
        return (
            <React.Fragment>
            <CssBaseline />
            <main>
              <div>
                <Container maxWidth="sm">
                  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Deliveries
                  </Typography>
                </Container>
              </div>
              <Container maxWidth="md">
                <Grid container spacing={4}>
                  {this.state.deliveries.map((delivery) => (
                      <Delivery delivery={delivery}></Delivery>
                  ))}
                </Grid>
              </Container>
            </main>
          </React.Fragment>

        )
    }
    
}
export default DeliveriesList;