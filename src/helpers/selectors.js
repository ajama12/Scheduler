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

export function getInterviewersForDay(state, day) {
  let foundInterviewer = "";
  let finalInterviewersArr = [];
  for(const dayIndex in state.days) {
    if (state.days[dayIndex].name === day) {
      foundInterviewer = state.days[dayIndex].interviewers;
    }
  }
  for(const interviewerDetails of foundInterviewer) {
    finalInterviewersArr.push(state.interviewers[interviewerDetails]);
  }
  return finalInterviewersArr;
}

export function getInterview(state, interview) {

  if (interview === null) {
    return null;
  }

  const { student, interviewer } = interview;
  const interviewerData = state.interviewers[interviewer];

  return {
    student,
    interviewer: {
      id: interviewerData.id,
      name: interviewerData.name,
      avatar: interviewerData.avatar
    }
  }
};