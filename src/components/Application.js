// import React from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')

    ]).then((all) => {
      // console.log("ALL: ", all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      const [days, appointments, interviewers] = all;

      // console.log("HERE: ", all[2].data);
    })
}, [])


  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const url = `/api/appointments/${id}`;
    return axios.delete(url)
      .then(() => setState({...state, appointments}));
  };


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  const url = `/api/appointments/${id}`;
  return axios.put(url, appointment)
  .then(() => setState({...state, appointments}));
}


  let dailyAppointments = [];
  const setDay = day => setState({ ...state, day });
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
       <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
