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
const EDIT = "EDIT";


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

  function editAppointment(interview) {

    transition(EDIT);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));

  }


  
  function deletAppointment(interview) {

    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));

  }
// console.log("PROPS INDEX: ", Object.keys(props));
console.log("PROPS INDEX: ", props.interview);


  return (
    <div>
      <Header time={props.time}/>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === EDIT && // EDIT form 
      <Form 
        interviewers={props.interviewers} 
        onDelete={deletAppointment} 
        name={props.interview.student} // this puts proper name as placeholder when you click edit button but it doesnt allow you to edit the name and save it...
        interviewer={props.interview.interviewer.id} // how to have interviewer already selected when you click edit button?
        // selected={props.selectedInterviewer}
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







