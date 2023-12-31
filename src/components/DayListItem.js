import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  
function formatSpots(){
  let formattedSpots = props.spots;

  return formattedSpots === 0 ?
      "no spots remaining"
       : 
    formattedSpots === 1 ? 
      "1 spot remaining" : `${formattedSpots} spots remaining`
  }

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected, 
    "day-list__item--full": props.spots === 0
  });
  return (
    <li 
      data-testid="day"
      className={dayClass} 
      onClick={() => props.setDay(props.name)}
    > 
      <h2 className="text--regular"> {props.name} </h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}