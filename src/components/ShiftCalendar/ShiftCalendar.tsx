import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { he } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Shift } from "../../types/shiftTypes";
import { ShiftStatus, shiftStatusLabels } from "../../constants/shiftStatus";
import * as S from "./ShiftCalendar.style";
import { updateShift } from "../../api/shifts";
import { Volunteer } from "../../types/volunteerTypes";

const locales = { he };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

interface ShiftCalendarProps {
  shifts: Shift[];
  setShifts: React.Dispatch<React.SetStateAction<Shift[]>>;
  volunteers: Volunteer[];
}

const getStatusColor = (status: ShiftStatus) => {
  switch (status) {
    case ShiftStatus.Planned:
      return "#64b5f6";
    case ShiftStatus.Completed:
      return "#81c784";
    case ShiftStatus.Cancelled:
      return "#e57373";
    default:
      return "#999";
  }
};

const ShiftCalendar: React.FC<ShiftCalendarProps> = (props) => {
  const { shifts, setShifts, volunteers } = props;
  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState(new Date());
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

  const eventStyleGetter = (
    event: Shift,
    start: Date,
    end: Date,
    isSelected: boolean
  ): { style: React.CSSProperties } => ({
    style: {
      backgroundColor: getStatusColor(event.status),
      color: "#fff",
      borderRadius: 5,
      padding: "4px",
      border: "none",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      direction: "rtl",
      textAlign: "right",
      maxWidth: "100%",
      boxSizing: "border-box",
    },
  });

  const getVolunteerName = (id?: string) => {
    const volunteer = volunteers.find((v) => v.id === id);
    return volunteer ? `${volunteer.name} ${volunteer.phone}` : "לא ידוע";
  };

  const closeModal = () => setSelectedShift(null);
  const handleCancelShift = async (shiftToCancel: Shift) => {
    try {
      const updatedShift = { ...shiftToCancel, status: ShiftStatus.Cancelled };
      await updateShift(updatedShift);
      setShifts((prev) =>
        prev.map((s) => (s.id === updatedShift.id ? updatedShift : s))
      );
      closeModal();
    } catch (error) {
      console.error("Failed to cancel shift:", error);
      alert("אירעה שגיאה בביטול המשמרת.");
    }
  };

  return (
    <>
      <S.CalendarContainer>
        <Calendar
          localizer={localizer}
          events={shifts.map((shift) => ({
            ...shift,
            title:
              shift.department +
              (shift.description ? ` - ${shift.description}` : ""),
            start: new Date(`${shift.date}T${shift.startTime}`),
            end: new Date(`${shift.date}T${shift.endTime}`),
          }))}
          startAccessor="start"
          endAccessor="end"
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          culture="he"
          messages={{
            next: "הבא",
            previous: "הקודם",
            today: "היום",
            month: "חודש",
            agenda: "רשימה",
            noEventsInRange: "אין משמרות בטווח הנבחר",
          }}
          views={["month", "agenda"]}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={(event) => setSelectedShift(event as Shift)}
          style={{ flex: 1 }}
        />
      </S.CalendarContainer>

      {selectedShift && (
        <S.ModalOverlay onClick={closeModal}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>{selectedShift.department}</h2>

            {selectedShift.description && (
              <S.Description>{selectedShift.description}</S.Description>
            )}

            <S.InfoRow>
              <b>מתחיל:</b>{" "}
              {new Date(
                `${selectedShift.date}T${selectedShift.startTime}`
              ).toLocaleString("he-IL", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </S.InfoRow>

            <S.InfoRow>
              <b>מסתיים:</b>{" "}
              {new Date(
                `${selectedShift.date}T${selectedShift.endTime}`
              ).toLocaleString("he-IL", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </S.InfoRow>

            <S.InfoRow>
              <b>סטטוס:</b> {shiftStatusLabels[selectedShift.status]}
            </S.InfoRow>

            {selectedShift.volunteerId && (
              <S.InfoRow>
                <b>מתנדב:</b> {getVolunteerName(selectedShift.volunteerId)}
              </S.InfoRow>
            )}

            <S.ButtonsRow>
              {selectedShift.status === ShiftStatus.Planned && (
                <S.CancelButton
                  onClick={() => {
                    if (selectedShift) {
                      handleCancelShift(selectedShift);
                    }
                  }}
                >
                  בטל משמרת
                </S.CancelButton>
              )}
              <S.CloseButton onClick={closeModal}>סגור</S.CloseButton>
            </S.ButtonsRow>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </>
  );
};

export default ShiftCalendar;
