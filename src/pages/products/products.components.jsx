import React from "react";
import "./products.styles.scss";
import axios from "axios";
import Card from "../../components/card/card.component";
import { CircularProgress } from "@material-ui/core";

class Productspage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      Loading: false,
    };
  }

  componentDidMount() {
    this.setState({ Loading: true });
    axios.get("https://b2b-backendd.herokuapp.com/products").then((res) => {
      this.setState({ products: res.data }, () => {
        console.log(this.state.products);
        this.setState({ Loading: false });
      });
    });
  }

  render() {
    if (this.state.Loading) {
      return <CircularProgress />;
    } else {
      return (
        <div className="collection-preview">
          <div className="preview">
            {this.state.products.map((item) => {
              console.log(item.data);
              return <Card item={item} />;
            })}
          </div>
        </div>
      );
    }
  }
}

export default Productspage;
