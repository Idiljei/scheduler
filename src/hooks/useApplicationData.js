import  { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const updateSpots = function (day, days, appointments) {
    //find appointments for the day and find which appointment has a null interview (which means those spots are available)

    //find day object
    const dayObj = days.find((item) => item.name === day); //find day
    const appointmentsIds = dayObj.appointments;

    //when we find day object we have array of appointments  //iterate its appointments array
    let spots = 0;
    for (const id of appointmentsIds) {
      const appointment = appointments[id]; // grabs the appointment by the id
      if (!appointment.interview) {
        spots++; // if its null add spots
      }
    }
    //update the spots in the day object (days)
    dayObj.spots = spots;

    const newDays = [...days]; //new array with ourdays
    return newDays;
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      const days = updateSpots(state.day, state.days, appointments);

      setState({ ...state, appointments, days }); //set state when you confirm the database gets updated in promise
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment, //new appointment or null
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments }); //set state when you confirm the database gets updated in promise
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get("/api/interviewers"),
    ]).then((res) => {
      setState((prev) => ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
