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


// We need to start by finding the object in our state.days array who's name matches the provided day.
//  With this information we can now access that specific days appointment array.

// We should also probably do a bit of validation. If there are no appointments on the given day, 
// our days data will be empty. According to our tests, in a case like this, we should return an empty array.