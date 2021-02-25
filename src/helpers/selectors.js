export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find((days) => days.name === day);
  if (state.days.length === 0 || foundDay === undefined) {
    return [];
  }
  return foundDay.appointments.map((id) => state.appointments[id]);
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}

export function getInterviewersForDay(state, day) {
  const foundDay = state.days.find((days) => days.name === day);
  if (state.days.length === 0 || foundDay === undefined) {
    return [];
  }
  return foundDay.interviewers.map((id) => state.interviewers[id]);
}
