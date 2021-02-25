import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      const [days, appointments, interviewers] = all;
    })
  }, [])


  const updateSpots = (appointments) => {
    const dayObj = state.days.find((item) => item.name === state.day);
    const appointmentIds = dayObj.appointments;
    let spots = 0;
    for (const id of appointmentIds) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    dayObj.spots = spots;
    const newDays = [...state.days];
    return newDays;
  };


  const cancelInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const url = `/api/appointments/${id}`;
    const promise = axios.delete(url);

  return promise
    .then((res) => {

      appointment.interview = null; 
      const days = updateSpots(appointments);
      setState((prev) => ({ ...prev, appointments, days }));
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}



  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(appointments);
    const url = `/api/appointments/${id}`;
    return axios.put(url, appointment).then(() => {
      setState({ ...state, appointments, days });
    });
  };



  const setDay = day => setState({ ...state, day });

  const obj = {
  state,
  cancelInterview,
  bookInterview,
  setDay
  }

  return obj;

}
