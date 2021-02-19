import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Form from "components/Appointment/Form.js";
import useVisualMode from "../../hooks/useVisualMode";
import { getInterviewersForDay } from "helpers/selectors"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";





export default function Appointment(props) {
 
  console.log("PROPS: ", props.interviewers);

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <div>
      <Header time={props.time}/>


      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
     <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
        )}    

        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)}/>}
  
    </div>
  )
    
}


/* {props.interview ? <Show onDelete={() => console.log("Delete")} onEdit={() => console.log("Edit")} student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty onAdd={() => null}/>} */






