const styles = (theme) => ({
  div: {
    display: "flex",
    flexDirection: "row",
  },
  divImage: {
    position: "relative",
    margin: "0 auto",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  image: {
    minWidth: 200,
    maxWidth: 400,
    maxHeight: 500,
    [theme.breakpoints.down("xs")]: {
      minWidth: 150,
    },
  },
  content: {
    padding: 25,
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 450,
  },
  input: {
    margin: "10px",
    width: "100%",
  },
  inputHalf: {
    margin: "10px",
    width: "45%",
  },
  inputInline: {
    display: "inline-flex",
    width: "100%",
  },
  button: {
    float: "right",
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
    "letter-spacing": " 0.03333em",
  },
});

export default styles;
