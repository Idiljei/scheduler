export function getAppointmentsForDay(state, day) {
  const filteredAppointments = [];

  state.days.forEach((element) => {
    //step 1 loops through array to grab the objects

    if (element.name === day) {
      // Step 2 if the day i.e "monday" matches the  state.days  name

      element.appointments.forEach((id) => {
        // Step 3looping over appointments array inside the object

        filteredAppointments.push(state.appointments[id]);
        // Step 4 comparing where it's id matches the id of states.appointments and return that value.
      });
    }
  });
  return filteredAppointments;
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
