import { forwardRef, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface FullCalendarComponentProps {
  events: any[];
  eventContent?: (eventInfo: any) => JSX.Element;
  dateClick?: (arg: any) => void;
}

const FullCalendarComponent = forwardRef<any, FullCalendarComponentProps>(
  ({ events, eventContent, dateClick }, ref) => {
    const calendarContainerRef = useRef<HTMLDivElement | null>(null);
    const calendarRef = useRef<any>(null);

    useEffect(() => {
      if (!calendarContainerRef.current) return;
      const observer = new ResizeObserver(() => {
        console.log("resize detected");
        if (calendarRef.current) {
          calendarRef.current.getApi().updateSize();
        }
      });
      observer.observe(calendarContainerRef.current);
      return () => observer.disconnect();
    }, []);

    return (
      <div
        className="calendar-container text-sm "
        ref={calendarContainerRef}
      >
        <FullCalendar
          ref={(el) => {
            calendarRef.current = el;
            if (typeof ref === "function") {
              ref(el);
            } else if (ref) {
              ref.current = el;
            }
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={eventContent}
          editable={true}
          aspectRatio={1.5}
          selectable={true}
          locale="pt"
          
          timeZone="local"
          height="90vh"
          dayMaxEvents={3} // <-- Limita a 3 eventos por dia, mostra "+n mais" se passar
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek"
          }}

          buttonText={{
            today: "Hoje",
            month: "Mês",
            week: "Semana"
          }}
          

          
          dateClick={dateClick}
        />
      </div>
    );
  }
);

export default FullCalendarComponent;
