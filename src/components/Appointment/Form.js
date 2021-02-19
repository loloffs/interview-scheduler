import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import React, { useState } from 'react';


export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const handleChange = event => setName(event.target.value  );


  const reset = function() {
    setName("");
    setInterviewer(null);
  };

  const cancel = function() {
    props.onCancel();
  };



  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="fullName"
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={handleChange}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel} reset={reset} cancel={cancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )
}