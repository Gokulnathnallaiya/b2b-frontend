import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Addproduct.styles.css";
toast.configure();
const styles = (theme) => ({
  textField: {
    width: "90%",
    fontWeight: 500,
    marginTop: "15px",
    marginBottom: "10px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class Addseller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sellers: [],
      productName: "",
      description: "",
      price: "",
      stock: "",
      seller: "",
      image: "",
      Loading: false,
      file: null,
    };
  }
  componentDidMount() {
    axios.get("https://b2b-backendd.herokuapp.com/sellers/").then((res) => {
      console.log(res.data);
      this.setState({ sellers: res.data });
    });
  }
  handleSubmit = () => {
    this.setState({ Loading: true });
    const formData = new FormData();
    formData.append("name", this.state.productName);
    formData.append("description", this.state.description);
    formData.append("price", this.state.price);
    formData.append("stock", this.state.stock);
    formData.append("seller", this.state.seller);
    formData.append("image", this.state.image);
    console.log(formData);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post(
        `https://b2b-backendd.herokuapp.com/products/newproduct`,
        formData,
        config
      )
      .then((res) => {
        console.log(JSON.stringify(res));
        this.setState({
          productName: "",
          description: "",
          price: "",
          stock: "",
          seller: "",
          image: null,
          Loading: false,
        });
        toast("Product Added", { type: "info" });
      })
      .catch((err) => {
        console.log(err);
        toast("Error Occured", { type: "error" });
      });
  };
  componentDidUpdate() {
    console.log(this.state);
  }
  handleSelect = (event) => {
    const { value } = event.target;
    this.setState({ seller: value });
  };
  handleChange = (event) => {
    const { id, value } = event.target;
    console.log(event.target.id);
    this.setState({ [id]: value });
  };
  onChange = (e) => {
    this.setState({ file: URL.createObjectURL(e.target.files[0]) });
    this.setState({ image: e.target.files[0] });
    console.log(e.target.files[0]);
  };
  render() {
    const { classes } = this.props;
    return (
      <form className="container">
        <h2 className="title">New Product</h2>
        <TextField
          size="small"
          id="productName"
          label="Product Name"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.productName}
          className={classes.textField}
        />
        <TextField
          size="small"
          id="description"
          onChange={this.handleChange}
          value={this.state.description}
          label="Description"
          multiline
          rows={2}
          variant="outlined"
          className={classes.textField}
        />

        <TextField
          size="small"
          label="Price"
          onChange={this.handleChange}
          value={this.state.price}
          id="price"
          variant="outlined"
          type="number"
          className={classes.textField}
        />
        <TextField
          size="small"
          id="stock"
          onChange={this.handleChange}
          value={this.state.stock}
          label="Stock"
          variant="outlined"
          className={classes.textField}
        />
        <FormControl variant="outlined" className={classes.textField}>
          <InputLabel id="demo-simple-select-outlined-label">Seller</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="seller"
            value={this.state.seller}
            onChange={this.handleSelect}
            label="Seller"
          >
            <MenuItem value="">
              <em>Select seller</em>
            </MenuItem>
            {this.state.sellers.map((item, i) => {
              console.log(item);
              if (item !== null) {
                return (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                );
              }
              return "";
            })}
          </Select>
          <div className="uploadContainer">
            <p>Upload Image</p>
            <input
              className="uploadImage"
              type="file"
              name="image"
              onChange={this.onChange}
            />
          </div>
          <div>
            <img alt="" className="imgPreview" src={this.state.file} />
          </div>
        </FormControl>

        <Button
          onClick={this.handleSubmit}
          color="primary"
          size="medium"
          variant="contained"
          style={{maxHeight: '100%', minWidth: '90%'}}
          
        >
          ADD PRODUCT
        </Button>

        <div>{this.state.Loading ? <CircularProgress /> : null}</div>
      </form>
    );
  }
}
export default withStyles(styles)(Addseller);
