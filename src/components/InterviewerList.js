import React from "react";

import PropTypes from 'prop-types';
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
const {interviewers, value, onChange} = props;

const interviewersItems = interviewers.map((interviewerObj) => (
  <InterviewerListItem
    key={interviewerObj.id}
    id={interviewerObj.id}
    name={interviewerObj.name}
    avatar={interviewerObj.avatar}
    selected={interviewerObj.id === value}
    setInterviewer={() => onChange(interviewerObj.id)}
  />
));

return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewers</h4>
    <ul className="interviewers__list">{interviewersItems}</ul> 
  </section>
)
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}
