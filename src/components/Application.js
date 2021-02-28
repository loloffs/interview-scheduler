// import React from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import React, { useState, useEffect } from "react";
import useApplicationData from "hooks/useApplicationData"
import axios from "axios"; // do i need this?
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";


export default function Application(props) {


const {
  state,
  setDay,
  bookInterview,
  cancelInterview
} = useApplicationData();

  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state, state.day);
  let interviewersForDay = [];
  interviewersForDay = getInterviewersForDay(state, state.day);


  const appointmentArr = dailyAppointments.map(appointment => {
  const interview = getInterview(state, appointment.interview);

  return (
    <Appointment
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewersForDay}
    />
  );
});

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} selectedDay={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentArr}
       <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}
