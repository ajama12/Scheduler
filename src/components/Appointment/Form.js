import React, { useState } from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {

const [student, setStudent] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);
const [error, setError] = useState("");

const reset = () => {
  setStudent("");
  setInterviewer(null);
}

const cancel = () => {
  reset(); 
  props.onCancel();
}

function validate() {
  if (student === "") {
    setError("Student name cannot be blank");
    return;
  }

   if (interviewer === null) {
    setError("Please select an interviewer");
    return;
  }
  props.onSave(student, interviewer);
}

const save = () => {
  validate()
}

  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          name="student"
          className="appointment__create-input text--semi-bold"
          value={student}
          type="text"
          placeholder="Enter Student Name"
          onChange={(event)=> setStudent(event.target.value)}
          data-testid="student-name-input"
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList 
        value={interviewer}
        onChange={setInterviewer}
        interviewers={props.interviewers}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel} >Cancel</Button>
        <Button confirm onClick={save} >Save</Button>
      </section>
    </section>
  </main>
  )
}
