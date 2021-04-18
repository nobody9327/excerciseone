import React from "react";
import { nobody } from "../constants/AppConstants";

function Rating(props) {
  const { rating, numOfReviews } = props;
  const stars = [];

  for (let num = rating, i = 1; i <= 5; i++, num--) {
    let classes = "fa fa-star";

    if (num < 1 && num > 0) {
      classes += "-half-o";
    } else if (num <= 0) {
      classes += "-o";
    }

    stars.push(<span key={i} className={classes}></span>);
  }

  stars.push(<span key={6}> {numOfReviews} {nobody.product.rating.reviews}</span>);

  return <div className="rating">{stars}</div>;
}

export default Rating;
