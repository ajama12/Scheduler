import React from "react";
import "components/Application.scss";
import useApplicationData from "hooks/useApplicationData";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {

const {bookInterview, cancelInterview, setDay, state} = useApplicationData();

const dailyInterviewers = getInterviewersForDay(state, state.day);

const dailyAppointments = getAppointmentsForDay(state, state.day).map(
  appointment => {
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
    }
  );

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
        {dailyAppointments}
      </section>
    </main>
  );
}