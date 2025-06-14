import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface FullCalendarComponentProps {
  events: any[];
  eventContent?: (eventInfo: any) => JSX.Element;
}

const FullCalendarComponent = ({ events, eventContent }: FullCalendarComponentProps) => {
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={eventContent}
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
