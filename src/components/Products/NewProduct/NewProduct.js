import { Component } from "react";
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
import { withRouter } from "react-router-dom";
import styles from "./FormStyles";
import fields from "./FormFields";

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.getDefaultState(props.productDetails.product),
      isSubmitting: false,
    };
  }

  getDefaultState(product = null) {
    let state = {
      values: {},
      errors: {},
      redirect: null,
      formCorrect: false,
    };

    if (product) {
      state.values._id = product._id;
      state.values["name"] = product["name"];
      state.values["description"] = product["description"];
      state.values["stock"] = product["stock"];
      state.values.grind = product["grind"];
      state.values.imageUrl = product["imageUrl"];
      state.values.format = product.format;
      state.formCorrect = true
      Object.values(fields).forEach((field) => {
        state.errors[field.name] = "";
      });
    } else {
      Object.values(fields).forEach((field) => {
        state.values[field.name] = field.defaultValue;
        state.errors[field.name] = "";
      });
    }
    return state;
  }
  componentDidMount(){
    if(this.props.productDetails?.product?.imageUrl){
      document.getElementById(
        "imageUrl"
      ).src = this.props.productDetails.product.imageUrl;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.newProduct?.created) {
      this.setState({ redirect: "/" });
    }
    if (
      prevProps.newProduct?.loading === true &&
      this.props.newProduct?.imageUrl
    ) {
      document.getElementById(
        "imageUrl"
      ).src = this.props.newProduct.imageUrl;

      this.setState((prevState) => {
        let newState = prevState;
        newState.values.imageUrl = this.props.newProduct.imageUrl;
        newState.errors.imageUrl = Validators.validate(
          fields.imageUrl.validators,
          this.props.newProduct.imageUrl
        );
        newState.formCorrect = this.checkFormCorrect(newState);
        return newState;
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
    imageCompression(image, options)
      .then(function (compressedImage) {
        const data = new FormData();
        data.append("cover", compressedImage, image.name);
        return data;
      })
      .then((formData) => ProductsService.uploadImage(formData))
      .catch((error) => {
      });
  };
  handleUploadImage = () => {
    const fileInput = document.getElementById("coverInput");
    fileInput.click();
  };
  createFormatTypes() {
    console.log(this.state)
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
              digitGroupSeparator=""
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
    let result = Object.values(fields).reduce((ac, v) => {
      return state.errors[v.name] !== "" || (typeof(state.values[v.name]) === "string" && state.values[v.name] === "") || (Array.isArray(state.values[v.name]) && state.values[v.name].length === 0) ? false
        : ac;
    }, true);
    return result;
  }
  addClick() {
    let newFormat = this.state.values.format;
    newFormat.push({
      name: "",
      price: "0",
    });
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        format: newFormat,
      },
      formCorrect: false,
    }));
  }
  removeClick(i) {
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
      newState.errors.grind = Validators.validate(
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

  submitDone() {
    this.setState({ isSubmitting: false });
    this.props.history.push("/");
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ isSubmitting: true });

    const action = this.props.productDetails.product 
    ? ProductsService.updateProduct
    : ProductsService.postProduct

    action(this.state.values)
    .then(() => this.submitDone())
    .catch(() => this.submitDone());
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
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
                    id="imageUrl"
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
                    value={this.state.values.name}
                    placeholder={fields.name.label}
                    error={this.state.errors[fields.name.name] !==""}
                    helperText={this.state.errors[fields.name.name]}
                    onChange={this.handleChange.bind(this, fields.name)}
                    fullWidth
                  />
                  <TextField
                    className={classes.input}
                    id={fields.description.name}
                    name={fields.description.label}
                    value={this.state.values.description}
                    placeholder={fields.description.label}
                    error={this.state.errors[fields.description.name] !==""}
                    helperText={errors.description}
                    onChange={this.handleChange.bind(this, fields.description)}
                    fullWidth
                  />
                  <TextField
                    className={classes.input}
                    id={fields.stock.name}
                    name={fields.stock.label}
                    value={this.state.values.stock}
                    placeholder={fields.stock.label}
                    error={this.state.errors[fields.stock.name] !==""}
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
                    value={this.state.values.grind}
                    onChange={(ev, value) => this.handleGrindChange(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        error={this.state.errors[fields.grind.name] !==""}
                        helperText={this.state.errors[fields.grind.name]}
                        label="Tipos de molido"
                        placeholder="Tipos de molido"
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
                  {!this.props.productDetails.product ?(<Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    disabled={!this.state.formCorrect || this.state.isSubmitting}
                    endIcon={<CreateIcon />}
                  >
                    Crear
                  </Button>) : (
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    disabled={!this.state.formCorrect || this.state.isSubmitting}
                    endIcon={<CreateIcon />}
                  >
                    Editar
                  </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  newProduct: state.ProductsReducer.newProduct,
  productDetails: state.ProductsReducer.productDetails,
  account: state.AuthReducer.account,
});

export default withRouter(connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(NewProduct))
);
