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


  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const daysArr = [...state.days];
    daysArr.map((x) => { 
      if(x.name === state.day) {
        x.spots += 1
     }
    });


    const url = `/api/appointments/${id}`;
    return axios.delete(url)
      .then(() => setState({...state, appointments, days: daysArr}));
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

    const daysArr = [...state.days];
    daysArr.map((x) => { 
      if(x.name === state.day) {
        x.spots -= 1
     }
    });
    const apptID = appointment.id;
    const url = `/api/appointments/${apptID}`;
    return axios.put(url, appointment)
    .then((res) => setState({...state, appointments}));
  }

  const setDay = day => setState({ ...state, day });


  const obj = {

  state,
  cancelInterview,
  bookInterview,
  setDay

  }

  return obj;

}
