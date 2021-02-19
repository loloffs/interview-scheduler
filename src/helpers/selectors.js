export function getAppointmentsForDay(state, day) {
  if(day.length === 0) return [];

  const days = state.days || [];
  const selectedDay = days.filter(item => item.name === day);

  if(selectedDay.length === 0) return [];

  const appointmentIDs = selectedDay[0].appointments || [];
  const allAppointments = Object.values(state.appointments);
  let appointments = [];

  for(const appointment of allAppointments) {
    if(appointmentIDs.includes(appointment.id)) {
      appointments.push(appointment);
    }
  }
  return appointments;
}


export function getInterview(state, interview) {

  if (interview === null) return null;

  const interviewData = {};
  const interviewerID = interview.interviewer;
  const studentName = interview.student;

  interviewData.student = studentName;
  interviewData.interviewer = state.interviewers[interviewerID];

  return interviewData;
};




export function getInterviewersForDay(state, day) {
  if(day.length === 0) return [];

  const days = state.days || [];
  const selectedDay = days.filter(item => item.name === day);

  if(selectedDay.length === 0) return [];

  const appointmentIDs = selectedDay[0].appointments || [];
  const allAppointments = Object.values(state.appointments);
  let appointments = [];

  for(const appointment of allAppointments) {
    if(appointmentIDs.includes(appointment.id)) {
      appointments.push(appointment);
    }
  }
  
  let interviewerID = [];
  for (const appointment of appointments) {
    if (appointment.interview) {
        console.log("TEST");
        interviewerID.push(appointment.interview.interviewer)
    }
  }

  const allInterviewers = Object.values(state.interviewers);
  let result = [];
    for (const interviewer of allInterviewers) {
      if (interviewerID.includes(interviewer.id)){
      result.push(interviewer);
    } 
  }
  return result;
}
