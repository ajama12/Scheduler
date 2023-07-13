export function getAppointmentsForDay(state, day) {
  let foundAppts = "";
  let finalApptArr = [];
  for(const dayIndex in state.days) {
    if (state.days[dayIndex].name === day) {
      foundAppts = state.days[dayIndex].appointments;
    }
  }
  for(const apptDetails of foundAppts) {
    finalApptArr.push(state.appointments[apptDetails]);
  }
  return finalApptArr;
}