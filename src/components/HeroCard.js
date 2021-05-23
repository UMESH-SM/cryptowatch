import React from "react";
import "./HeroCard.css";

export default function HeroCard({ symbol, image, price }) {
  function formatPrice(price) {
    const len = price.split(".")[0];
    price = Number(price);
    if (len.length > 9) {
      return "$ " + (price / 1000000000).toFixed(2) + "B";
    } else if (len.length > 6) {
      return "$ " + (price / 1000000).toFixed(2) + "M";
    } else if (len.length > 3) {
      return "$ " + (price / 1000).toFixed(2) + "K";
    }
    return "$ " + price.toFixed(2);
  }

  return (
    <div className="heroCard">
      <div className="heroCard__firstRow">
        <div className="heroCard__name">{symbol}</div>
        <img className="heroCard__image" src={image} alt={symbol} />
      </div>
      <div className="heroCard__secondRow">{formatPrice(price)}</div>
    </div>
  );
}
