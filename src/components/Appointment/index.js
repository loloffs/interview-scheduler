import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Form from "components/Appointment/Form.js";
import Error from "components/Appointment/Error.js";
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
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE"; 
const ERROR_DELETE = "ERROR_DELETE";

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
  
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  
  function deletAppointment(event) {

    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }



  return (
    <div>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === ERROR_SAVE && <Error message="ERRORR SAVING" onCancel={() => transition(SHOW)} />} {/* Error catch */}
      {mode === ERROR_DELETE && <Error message="ERROR DELETING" onCancel={() => transition(SHOW)} />}  {/* Error catch */}
      {mode === EDIT && // EDIT form 
      <Form 
        interviewers={props.interviewers} 
        onDelete={deletAppointment} 
        name={props.interview.student} // student name placeholder
        interviewer={props.interview.interviewer.id} // interviewer placeholder
        onSave={save} 
        onCancel={() => back(SHOW)}/>}
      {mode === CONFIRM && 
      <Confirm
        message="Are you sure you want to delete?" 
        onCancel={back} 
        onConfirm={deletAppointment} 
        />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === SHOW && (
     <Show      
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)} // transition to "edit" form
      />)}    
      {mode === CREATE && <Form interviewers={props.interviewers} onDelete={deletAppointment} onSave={save} onCancel={() => back(EMPTY)}/>}
    </div>
  )    
}
