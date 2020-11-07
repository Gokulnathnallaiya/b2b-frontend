import React from "react";

import "./card.styles.scss";

const Card = ({ item }) => {
  const { title, disPrice, seller, _id } = item;

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
          <span className="name">{title}</span>
          <span className="price"> {"₹ " + disPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
