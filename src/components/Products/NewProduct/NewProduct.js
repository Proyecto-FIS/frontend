import { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Tooltip,
  IconButton,
  Button,
  TextField,
  Grid,
} from "@material-ui/core";
import Validators from "../../../utils/Validators";
import DeleteIcon from "@material-ui/icons/Delete";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withStyles } from "@material-ui/core/styles";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";
import ProductsService from "../../../services/ProductsService";
import imageCompression from "browser-image-compression";
import { connect } from "react-redux";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { Redirect } from "react-router-dom";
import styles from "./FormStyles";
import fields from "./FormFields";

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props.product);
  }

  getDefaultState(product = null) {
    let state = {
      values: {},
      errors: {},
      redirect: null,
      formCorrect: false,
    };

    if (product) {
      Object.values(fields).forEach((field) => {
        state.values[field.name] = product[field.name];
        state.errors[field.name] = "";
      });
      state.values._id = product._id;
    } else {
      Object.values(fields).forEach((field) => {
        state.values[field.name] = field.defaultValue;
        state.errors[field.name] = "";
      });
    }
    console.log(state);
    return state;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.newProduct?.created) {
      this.setState({ redirect: "/" });
    }
    if (
      prevProps.newProduct?.loading === true &&
      this.props.newProduct?.productImage
    ) {
      document.getElementById(
        "productImg"
      ).src = this.props.newProduct.productImage;
      this.setState({
        productImg: this.props.newProduct.productImage,
      });
    }
  }
  handleImageChange = async (event) => {
    const image = event.target.files[0];
    var options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      onProgress: function () {
        return true;
      },
    };
    let formData = await imageCompression(image, options)
      .then(function (compressedImage) {
        const data = new FormData();
        data.append("cover", compressedImage, image.name);
        return data;
      })
      .catch((error) => {
        console.log(error.message);
      });
    ProductsService.uploadImage(formData);
  };
  handleUploadImage = () => {
    const fileInput = document.getElementById("coverInput");
    fileInput.click();
  };
  createFormatTypes() {
    return Array.isArray(this.state.values.format)
      ? this.state.values.format?.map((el, i) => (
          <div key={i} className={this.props.classes.inputInline}>
            <TextField
              className={this.props.classes.input}
              id={fields.format.name}
              name="name"
              value={this.state.values.format[i].name}
              placeholder={fields.format.label}
              onChange={this.handleFormatChange.bind(this, i)}
            />
            <CurrencyTextField
              className={this.props.classes.input}
              name="price"
              value={this.state.values.format[i].price}
              placeholder="Price"
              variant="standard"
              currencySymbol="€"
              outputFormat="number"
              minimumValue="0"
              onChange={this.handleFormatChange.bind(this, i)}
            />
            {i > 0 ? (
              <IconButton
                aria-label="delete"
                onClick={this.removeClick.bind(this, i)}
              >
                <DeleteIcon />
              </IconButton>
            ) : null}
          </div>
        ))
      : null;
  }
  checkFormCorrect(state) {
    console.log(state);
    return Object.values(fields).reduce((ac, v) => {
      console.log(state.errors[v.name], state.values[v.name]);
      return state.errors[v.name] !== "" ||
        state.values[v.name] === "" ||
        state.values.format[0].name !== ""
        ? false
        : ac;
    }, true);
  }
  addClick() {
    let newFormat = this.state.values.format;
    newFormat.push({
      name: "",
      price: "0",
    });
    this.setState({
      values: {
        format: newFormat,
      },
      formCorrect: false,
    });
  }
  removeClick(i) {
    console.log(i);
    let lastValues = this.state.values.format;
    lastValues.splice(i, 1);
    this.setState({
      values: {
        format: lastValues,
      },
    });
  }
  handleChange = (field, e) => {
    this.setState((prevState) => {
      let newState = prevState;
      newState.values[field.name] = e.target.value;
      newState.errors[field.name] = Validators.validate(
        field.validators,
        e.target.value
      );
      newState.formCorrect = this.checkFormCorrect(newState);
      return newState;
    });
  };
  handleGrindChange = (values) => {
    this.setState((prevState) => {
      let newState = prevState;
      newState.values.grind = values;
      newState.errors.grinds = Validators.validate(
        fields.grind.validators,
        values
      );
      newState.formCorrect = this.checkFormCorrect(newState);
      return newState;
    });
  };
  handleFormatChange = (i, event) => {
    this.setState((prevState) => {
      let newState = prevState;
      newState.values.format[i][event.target.name] = event.target.value;
      newState.errors.format = Validators.validate(
        fields.format.validators,
        newState.values.format
      );
      newState.formCorrect = this.checkFormCorrect(newState);
      return newState;
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    ProductsService.postProduct({
      providerId: this.props.account._id,
      name: this.state.title,
      description: this.state.description,
      grind: this.state.grinds,
      stock: this.state.stock,
      imageUrl: this.state.productImg,
      format: this.state.formatTypes,
    });
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      newProduct: { loading },
    } = this.props;
    const grindTypes = [
      "Grueso",
      "Medio grueso",
      "Medio",
      "Medio fino",
      "Fino",
      "Extra fino espresso",
    ];
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Card className={classes.card}>
        <div className={classes.div}>
          <CardContent className={classes.content}>
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <img
                    id="productImg"
                    alt="Product"
                    className={classes.image}
                    src="https://coffaine.s3.eu-west-3.amazonaws.com/no-image.png"
                  />
                  <input
                    type="file"
                    id="coverInput"
                    name="cover"
                    onChange={this.handleImageChange}
                    hidden="hidden"
                  />
                  <Tooltip title={"Upload Image"} placement="bottom">
                    <IconButton
                      className="button"
                      onClick={this.handleUploadImage}
                    >
                      <ImageSearchIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  {errors.imageUrl ? (
                    <p className={classes.errorText} id="name-helper-text">
                      Upload an Image
                    </p>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.input}
                    id={fields.name.name}
                    name={fields.name.label}
                    placeholder={fields.name.label}
                    error={this.state.errors[fields.name.name]}
                    helperText={this.state.errors[fields.name.name]}
                    onChange={this.handleChange.bind(this, fields.name)}
                    fullWidth
                  />
                  <TextField
                    className={classes.input}
                    id={fields.description.name}
                    name={fields.description.label}
                    placeholder={fields.description.label}
                    error={this.state.errors[fields.description.name]}
                    helperText={errors.description}
                    onChange={this.handleChange.bind(this, fields.description)}
                    fullWidth
                  />
                  <TextField
                    className={classes.input}
                    id={fields.stock.name}
                    name={fields.stock.label}
                    placeholder={fields.stock.label}
                    error={this.state.errors[fields.stock.name]}
                    helperText={errors.stock}
                    onChange={this.handleChange.bind(this, fields.stock)}
                    type="number"
                    fullWidth
                  />
                  <Typography
                    className={classes.input}
                    variant="body1"
                    color="textSecondary"
                  >
                    Selecciona los tipos de molido que va a tener el producto:{" "}
                  </Typography>
                  <Autocomplete
                    multiple
                    options={grindTypes}
                    className={classes.input}
                    onChange={(ev, value) => this.handleGrindChange(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        error={this.state.errors[fields.grind.name]}
                        helperText={this.state.errors[fields.grind.name]}
                        label="Grind Types"
                        placeholder="Grind Types"
                      />
                    )}
                  />
                  <br />
                  <Typography
                    className={classes.input}
                    variant="body1"
                    color="textSecondary"
                  >
                    Selecciona los distintos envasados que va a tener el
                    producto:{" "}
                  </Typography>
                  {this.createFormatTypes()}
                  <IconButton
                    aria-label="addFormat"
                    className={classes.button}
                    onClick={this.addClick.bind(this)}
                  >
                    <AddIcon />
                  </IconButton>
                  {this.state.errors.format !== "" ? (
                    <p className={classes.errorText} id="name-helper-text">
                      {this.state.errors.format}
                    </p>
                  ) : null}
                  <br />
                  <br />
                  <br />
                  <br />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    disabled={!this.state.formCorrect}
                    endIcon={<CreateIcon />}
                  >
                    Crear
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </div>
      </Card>
    );
  }
}

NewProduct.propTypes = {
  classes: PropTypes.object.isRequired,
  newProduct: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  newProduct: state.ProductsReducer.newProduct,
  account: state.AuthReducer.account,
});

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(NewProduct)
);
