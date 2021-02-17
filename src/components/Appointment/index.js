import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";


export default function Appointment(props) {
  return (
    <div>
      <Header time={props.time}/>
      {props.interview ? <Show onDelete={() => console.log("Delete")} onEdit={() => console.log("Edit")} student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty onAdd={() => null}/>}
    </div>
  )
}
