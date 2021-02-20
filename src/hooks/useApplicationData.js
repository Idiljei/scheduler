import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });


  const bookInterview = (id, interview) => {
    console.log("ID, INTERVIEW", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        setState({ ...state, appointments }); //set state when you confirm the database gets updated in promise
        console.log(res.data);
      })
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null, //no need to create a new inerview obj
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment, //new appointment or null
    };

    return axios
      .delete(`/api/appointments/${id}`) //dont pass appointment as second param - only delete key
      .then((res) => {
        setState({ ...state, appointments }); //set state when you confirm the database gets updated in promise
        console.log("DELETE", res.data);
      })
      
  };

  useEffect(() => {
    console.log(state.interviewers);
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

  return {state, setDay, bookInterview, cancelInterview}

}