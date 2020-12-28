import { Component } from "react";
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    CardMedia,
    FormControl,
    InputLabel,
    Typography,
    Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const styles = (theme) => ({
    div: {
        display: 'flex',
        flexDirection: "row",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    image:{
        minWidth: 200,
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
    button: {
        float: 'right'
    }
});

class ProductDetails extends Component {
    state = {
        grindType: "",
        formatType: {},
        productPrice: 0.0
    };
    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        if(name === "formatType" && value){
            const formats = this.props.product.format;
            const id = event.target.value
            const format = formats.find(f => { return f._id===id})
            this.setState({
                productPrice: format.price
            })
        }
        this.setState({
          [name]: event.target.value,
        });
    };

    render() {
        const {classes, product:{ name, description, format, grind, imageUrl }} = this.props;  

        return (
            <Card className={classes.card}>
                <div className={classes.div}>
                    <CardMedia component="img" image={imageUrl} title={name}className={classes.image}/>
                    <CardContent className={classes.content}>
                        <Typography variant="h2" color="primary">{name}</Typography>
                        <Typography variant="h5" color="textSecondary">{description}</Typography>
                        <br />
                        <br />
                        <FormControl className={classes.formControl}>
                            <InputLabel>Tipo de molido</InputLabel>
                            <Select
                                native
                                value={this.state.grindType}
                                onChange={e => this.handleChange(e)}
                                inputProps={{
                                    name: "grindType",
                                    id: "grindType",
                                }}
                            >
                                <option aria-label="None" value="" />
                                {grind.map((grindType,index) => (
                                <option key={index} value={grindType}>
                                    {grindType}
                                </option>
                                ))}  
                            </Select>
                        </FormControl>
                        <br />
                        <FormControl className={classes.formControl}>
                            <InputLabel>Formato</InputLabel>
                            <Select
                                native
                                value={this.state.formatType}
                                onChange={e => this.handleChange(e)}
                                inputProps={{
                                    name: "formatType",
                                    id: "formatType",
                                }}
                            >
                                <option aria-label="None" value="" />
                                {format.map((formatType,index) => (
                                <option key={index} value={formatType._id}>
                                    {formatType.name}
                                </option>
                                ))}  
                            </Select>
                        </FormControl>
                        <br />
                        <br />
                        <Typography variant="h5" color="primary">{this.state.productPrice} €</Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            endIcon={<ShoppingBasketIcon />}
                        >
                            Comprar
                        </Button>
                    </CardContent>
                </div>
            </Card>
        );
    }
}

ProductDetails.propTypes = {
    product: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}
export default (withStyles(styles, { withTheme: true })(ProductDetails));
