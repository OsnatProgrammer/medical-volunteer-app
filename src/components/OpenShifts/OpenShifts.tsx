import React, { useEffect, useState } from "react";
import * as S from "./OpenShifts.style";
import { fetchShifts, updateShift } from "../../api/shifts";
import { Shift } from "../../types/shiftTypes";

type OpenShiftsProps = {
  volunteerId: string;
};

const OpenShifts: React.FC<OpenShiftsProps> = (props) => {
  const { volunteerId } = props;
  const [openShifts, setOpenShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadShifts() {
      setLoading(true);
      setError(null);
      try {
        const shifts = await fetchShifts();
        const filtered = shifts.filter((shift: Shift) => !shift.volunteerId);
        setOpenShifts(filtered);
      } catch (err) {
        console.error(err);
        setError("אירעה שגיאה בעת טעינת המשמרות.");
      } finally {
        setLoading(false);
      }
    }
    loadShifts();
  }, []);

  const handleAssign = async (shiftId: string) => {
    try {
      const shift = openShifts.find((s) => s.id === shiftId);

      if (!shift) return;
      const updatedShift = { ...shift, volunteerId };
      await updateShift(updatedShift);

      setOpenShifts((prev) => prev.filter((s) => s.id !== shiftId));
    } catch (err) {
      alert("שגיאה בשיבוץ המשמרת");
      console.error(err);
    }
  };

  if (loading) return <div>טוען משמרות פתוחות...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (openShifts.length === 0) return <div>אין משמרות פתוחות כרגע.</div>;

  return (
    <S.Container>
      {openShifts.map((shift) => (
        <S.ShiftCard key={shift.id}>
          <S.ShiftDate>
            {new Date(shift.date).toLocaleDateString("he-IL")}
          </S.ShiftDate>
          <S.ShiftDetails>
            מחלקה: {shift.department} <br />
            {shift.startTime} - {shift.endTime}
          </S.ShiftDetails>
          <S.AssignButton onClick={() => handleAssign(shift.id)}>
            שבץ אותי
          </S.AssignButton>
        </S.ShiftCard>
      ))}
    </S.Container>
  );
};

export default OpenShifts;
