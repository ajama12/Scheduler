import React, { Fragment } from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING"
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE"; 
  const ERROR_DELETE = "ERROR_DELETE";

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
      if (mode === CREATE) {
        transition(SHOW);
      } else if (mode === EDIT) {
        transition(SHOW);
      }
    })
    .catch(() => {
      transition(ERROR_SAVE, true)
    })
  };

  const cancel = function() {
    if (mode === SHOW) {
      transition(CONFIRM);
    }
    if (mode === CONFIRM) {
      transition(DELETING, true);
      props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
    })
    }
    if (mode === EDIT) {
      transition(SHOW);
    }
  };

return (
  <Fragment>
  <article  data-testid="appointment" className="appointment">
    <Header time={props.time}/>
      {mode === EMPTY && ( 
        <Empty 
          onAdd={() => transition(CREATE)} 
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancel}
          onEdit={() => transition(EDIT)}
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
      {mode === EDIT && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={back}
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        /> 
        )}
        {mode === ERROR_SAVE && (
          <Error
            message="Could not save appointment"
            onClose={back}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message="Could not delete appointment"
            onClose={back}
          />
        )}
  </article>
  </Fragment>
)
}