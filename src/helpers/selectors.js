export function getAppointmentsForDay(state, day) {
  const filteredAppointments = []; //empty array to push state.days object 


  state.days.forEach(element => { //loops through array to grab the objects 


    if (element.name === day) { // if the day i.e "monday" matches the  state.days  name  

      element.appointments.forEach(id => { //looping over appointments array inside the object 

        filteredAppointments.push(state.appointments[id]); //comparing where it's id matches the id of states.appointments and return that value.

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


// The function should return a new object containing the interview data when we pass it an object that contains the interviewer.
// Otherwise, the function should return null. The object it returns should look like this:


// export function getInterviewsForDay(state, day) {
//   const filteredAppointments = [];
//   state.days.forEach(element => {
//     if (element.name === day) {
//       element.interviewers.forEach(id => {
//         filteredAppointments.push(state.interviewers[id]); //[1,2,3]
//       });
//     }
//   });
//   return filteredAppointments;
// } 

export function getInterviewersForDay(state, day) {
  const foundDay = state.days.find((days) => days.name === day);
  if (state.days.length === 0 || foundDay === undefined) {
    return [];
  }
  return foundDay.interviewers.map((id) => state.interviewers[id]);
}
