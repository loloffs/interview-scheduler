import React from "react";

export default function Show(props) {

  return (
    <main className="appointment__card appointment__card--show">
    <section className="appointment__card-left">
      <h2 className="text--regular">{props.student}</h2>
      <section className="interviewer">
        <h4 className="text--light">Interviewer</h4>
        <h3 className="text--regular">{props.interviewer.name}</h3> {/* if you get this error, its probably becasue you tried to create an appointment with no name. turn this: props.interviewer.name into this: props.interviewer, then refresh the page, put a name in, and put name back at the end of props.interviewer  */}
      </section>
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <img
          onClick={props.onEdit}
          className="appointment__actions-button"
          src="images/edit.png"
          alt="Edit"
        />
        <img
          onClick={props.onDelete}
          className="appointment__actions-button"
          src="images/trash.png"
          alt="Delete"
        />
      </section>
     </section>
    </main>
  )
}
