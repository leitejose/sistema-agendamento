// FullCalendarComponent.tsx
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptLocale from "@fullcalendar/core/locales/pt"

const FullCalendarComponent = () => {
  const [events, setEvents] = useState([
    { title: "Evento 1", start: new Date(), id: "1" },
    { title: "Evento 2", start: "2024-12-10", id: "2" },
  ]);

  const handleDateClick = (info: any) => {
    alert(`Data clicada: ${info.dateStr}`);
  };

  const handleEventClick = (info: any) => {
    alert(`Evento clicado: ${info.event.title}`);
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
        selectable={true}
        locale="pt"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
};

export default FullCalendarComponent;
