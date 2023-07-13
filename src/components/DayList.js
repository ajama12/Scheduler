import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days } = props;

  const dayListItems = days.map((dayObj) => (
    <DayListItem 
      key={dayObj.id}
      name={dayObj.name}
      spots={dayObj.spots}
      selected={dayObj.name === props.days}
      setDays={props.setDays}
    />
  ));
    return (
      <ul>
        {dayListItems}
      </ul> 
    );
}