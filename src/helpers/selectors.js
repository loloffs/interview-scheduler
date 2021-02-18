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
