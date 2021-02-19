import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Form from "components/Appointment/Form.js";
import useVisualMode from "../../hooks/useVisualMode";
import { getInterviewersForDay } from "helpers/selectors"
import Status from './Status';
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVE";
const CONFIRM = "CONFIRM";
const DELETING = "DELETE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

    
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  
  }

  
  function deletAppointment(interview) {

    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));

  }
console.log("MODE: ", mode);

  return (
    <div>
      <Header time={props.time}/>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === CONFIRM && 
      <Confirm
        message="Are you sure!?" 
        onCancel={back} 
        onConfirm={deletAppointment} 
        />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === SHOW && (
     <Show      
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
      />)}    
      {mode === CREATE && <Form interviewers={props.interviewers} onDelete={deletAppointment} onSave={save} onCancel={() => back(EMPTY)}/>}
    </div>
  )    
}







