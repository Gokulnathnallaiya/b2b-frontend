import React, { Component } from "react";
import { MenuItems } from "./Menuitems";
import "./Navbar.styles.css";
import {Button} from '../customButton/Button.component';
import { withRouter } from "react-router-dom";
class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked:false,
    };
  }
  componentDidMount(){
    console.log(this.props)
  }
 
 

  handleClick=()=>{
    this.setState({clicked:!this.state.clicked})
  }
  buttonClick=()=>{
    this.props.history.push('/new/product')
  }

  render() {
    return (
      <nav className="navbarItems">
        <h1 className="navbar-logo">
          <i className="fab fa-react"> Mavinzent</i>
        </h1>
        <div className="menu-icon" onClick={this.handleClick}>
          <i className={this.state.clicked?'fas fa-times':'fas fa-bars'}></i>
        </div>
        <ul className={this.state.clicked? 'nav-menu active':'nav-menu'}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
        <Button className="header-button" onClick={this.buttonClick} >New Product</Button>
      </nav>
    );
  }
}
export default (withRouter(Navbar));
