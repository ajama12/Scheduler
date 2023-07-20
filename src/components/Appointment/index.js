import React, { Fragment } from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING"

  const {mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );  

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
  };

  const cancel = function() {
    if (mode === SHOW) {
      transition(CONFIRM);
    }
    if (mode === CONFIRM) {
      transition(DELETING);
      props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
    }
  };

return (
  <Fragment>
  <article className="appointment">
    <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={cancel}
      />
      )}
      {mode === CREATE && 
        <Form 
          interviewers={props.interviewers} 
          onCancel={back}
          onSave={save}
        /> }
      {mode === SAVING && (
        <Status 
          message="Saving"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete this?"
          onCancel={back}
          onConfirm={cancel}
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
  </article>
  </Fragment>
)
}