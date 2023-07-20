import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
const [state, setState] = useState({
  day: "Monday", 
  days: [],
  appointments: {},
  interviewers: {}
});

const dailyAppointments = getAppointmentsForDay(state, state.day);
const dailyInterviewers = getInterviewersForDay(state, state.day);
const setDay = day => setState({ ...state, day });

const bookInterview = function(id, interview) {
return axios.put(`/api/appointments/${id}`, {interview})
  .then(() => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
  })
  .catch(err => {
    console.log(err);
  })
}

const cancelInterview = function(id) {
  return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments, 
        [id]: appointment
      }; 
      setState({
        ...state, 
        appointments
      })
    })
    .catch((err) => {
      console.log(err);
    })
}
useEffect(() => {
  Promise.all([
    axios.get("/api/days"),
    axios.get("api/appointments"),
    axios.get("api/interviewers")
  ]).then((all) => {
    setState(prev => ({
      ...prev, 
      days: all[0].data, 
      appointments: all[1].data, 
      interviewers: all[2].data
    }));
  }).catch(error => {
      console.log(error);
    });
}, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          const interview = getInterview(state, appointment.interview) 
          return (
          <Appointment 
            key={appointment.id}
            {...appointment}
            interviewers={dailyInterviewers}
            interview={interview}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
          />
        );
      })}
      </section>
    </main>
  );
}