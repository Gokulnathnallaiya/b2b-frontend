import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Addseller.styles.css";
toast.configure();
const styles = (theme) => ({
  textField: {
    width: "90%",
    fontWeight: 500,
    marginTop: "15px",
    marginBottom: "10px",
  },
});

class Addseller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerName: "",
      Location: "",
      ProfitPercentage: "",
      SupportEmail: "",
      Loading: false,
    };
  }
  handleSubmit = (event) => {
    this.setState({ Loading: true });

    axios
      .post(`https://b2b-backendd.herokuapp.com/sellers/newseller`, {
        sellerName: this.state.sellerName,
        Location: this.state.Location,
        ProfitPercentage: this.state.ProfitPercentage,
        SupportEmail: this.state.SupportEmail,
      })
      .then((res) => {
        console.log(JSON.stringify(res));
        this.setState({
            sellerName: "",
            Location: "",
            ProfitPercentage: "",
            SupportEmail: "",
            Loading: false,
          });
        toast("Seller Created", { type: "info" });
        
      })
      .catch((err) => {
        console.log(err);
        toast("Error Occured", { type: "error" });

      });
  };

  handleChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };
  render() {
    const { classes } = this.props;
    return (
      <form className="container">
        <h2 className="title">New Seller</h2>
        <TextField
          size="small"
          id="sellerName"
          label="Store Name"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.sellerName}
          className={classes.textField}
        />
        <TextField
          size="small"
          id="Location"
          onChange={this.handleChange}
          value={this.state.Location}
          label="Location"
          multiline
          rows={2}
          variant="outlined"
          className={classes.textField}
        />

        <TextField
          size="small"
          label="Profit percentage"
          onChange={this.handleChange}
          value={this.state.ProfitPercentage}
          id="ProfitPercentage"
          variant="outlined"
          type="number"
          className={classes.textField}
        />
        <TextField
          size="small"
          id="SupportEmail"
          onChange={this.handleChange}
          value={this.state.SupportEmail}
          label="Support Email"
          variant="outlined"
          className={classes.textField}
        />

        <Button
          onClick={this.handleSubmit}
          color="primary"
          size="medium"
          variant="contained"
          style={{maxHeight: '100%', minWidth: '90%'}}
        >
          CREATE SELLER
        </Button>
        {this.state.Loading ? <CircularProgress /> : null}
      </form>
    );
  }
}
export default withStyles(styles)(Addseller);
