import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";


function formatSpots(props){
  let formattedSpots = props.spots;

    if(props.selected && formattedSpots > 0) {
      formattedSpots -= 1;
    }
    return formattedSpots
  }

export default function DayListItem(props) {

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
      {formatSpots(props) === 0 ? (
        <h3 className="text--light">no spots remaining</h3> 
      ) : (
        <h3 className="text--light">
        {formatSpots(props)}
        {formatSpots(props) === 1 ? " spot remaining" : " spots remaining"}
        </h3>
      )}
    </li>
  );
}