import React from "react";

import "components/InterviewerListItem.scss";
import classNames from "classnames";

function selectedItem(props) {
  let selected = false; 
  if (props.selected){
    selected = true;
  }
  return selected;
}

export default function InterviewerListItem(props) {

const interviewerClass = classNames("interviewers__item", {
  "interviewers__item-image": props.avatar,
  "interviewers__item--selected": props.selected, 
  "interviewers__item-image--selected": props.avatar && props.selected,
});

  return (
    <li 
      onClick={() => props.setInterviewer(props.id)} 
      className={interviewerClass}
    >
      {props.avatar && 
        <img
        className="interviewers__item-image" 
        src={props.avatar}
        alt={props.name}
      />}
      {selectedItem(props) === true && <div> {props.name} </div>}
  </li>
  )
}