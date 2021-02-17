import React, { Fragment } from 'react'
// import classnames from "classnames";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Confirm from "components/Appointment/Confirm.js";
import Status from "components/Appointment/Status.js";




export default function Appointment(props) {


  // React.createElement(
  //   Fragment,
  //   null,
  //   React.createElement("h1", null, "Hello, ", name, "."),
  //   React.createElement(
  //     Button,
  //     { onClick: reset },
  //     "Reset"
  //   )
  // );


  return (
    <div>
      <Header {...props.time}/>
      {props.interview ? <Show {...props.student} {...props.interviewer}/> : <Empty onAdd={() => null}/>}
      
      {/* <Confirm />
      <Status /> */}
    </div>
  )
}



// empty, show, form, confirm, status, error