import React from "react";

import "./card.styles.scss";

const Card = ({ item }) => {
  const { name, price, seller, _id } = item;

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${`https://b2b-backendd.herokuapp.com/products/${_id}/image`})`,
        }}
      />
      <div className="footer">
        <div className="collection-footer">
          <span className="seller">Sold by {seller}</span>
          <span className="name">{name}</span>
          <span className="price"> {"₹ " + price}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
