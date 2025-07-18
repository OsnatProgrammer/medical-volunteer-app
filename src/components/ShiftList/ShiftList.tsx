import React, { useEffect, useState, useCallback } from "react";
import * as S from "./ShiftList.style";
import { Shift } from "../../types/shiftTypes";
import { fetchShifts, updateShift } from "../../api/shifts";
import { shiftStatusLabels } from "../../constants/shiftStatus";

interface ShiftListProps {
  volunteerId: string;
  title: string;
  filterFn?: (shift: Shift) => boolean;
  emptyMessage?: string;
  allowCancel?: boolean;
}

const ShiftList: React.FC<ShiftListProps> = (props) => {
  const {
    volunteerId,
    title,
    filterFn,
    emptyMessage,
    allowCancel = false,
  } = props;
  const [filteredShifts, setFilteredShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(false);

  const loadShifts = useCallback(async () => {
    setLoading(true);
    try {
      const allShifts = await fetchShifts();

      const filtered = allShifts
        .filter(
          (shift) =>
            shift.volunteerId === volunteerId &&
            (filterFn ? filterFn(shift) : true)
        )
        .sort((a, b) =>
          `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`)
        );

      setFilteredShifts(filtered);
    } catch (error) {
      console.error("שגיאה בטעינת משמרות:", error);
    } finally {
      setLoading(false);
    }
  }, [volunteerId, filterFn]);

  useEffect(() => {
    loadShifts();
  }, [loadShifts]);

  const handleCancelShift = async (shiftId: string) => {
    if (!window.confirm("האם אתה בטוח שברצונך לבטל את המשמרת הזו?")) return;

    try {
      const shiftToCancel = filteredShifts.find((s) => s.id === shiftId);
      if (!shiftToCancel) return;

      const updatedShift = { ...shiftToCancel, volunteerId: null };

      await updateShift(updatedShift);

      await loadShifts();
    } catch (error) {
      alert("שגיאה בביטול המשמרת. אנא נסה שוב.");
      console.error(error);
    }
  };

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      {loading ? (
        <S.Loading>טוען משמרות...</S.Loading>
      ) : filteredShifts.length === 0 ? (
        <S.NoShifts>{emptyMessage || "אין משמרות"}</S.NoShifts>
      ) : (
        filteredShifts.map((shift) => (
          <S.ShiftCard key={shift.id}>
            <S.ShiftText>📅 תאריך: {shift.date}</S.ShiftText>
            <S.ShiftText>
              🕒 שעות: {shift.startTime} - {shift.endTime}
            </S.ShiftText>
            <S.ShiftText>🏥 מחלקה: {shift.department}</S.ShiftText>
            <S.ShiftText>
              🛈 סטטוס: {shiftStatusLabels[shift.status]}
            </S.ShiftText>

            {allowCancel && (
              <S.CancelButton onClick={() => handleCancelShift(shift.id)}>
                ביטול משמרת
              </S.CancelButton>
            )}
          </S.ShiftCard>
        ))
      )}
    </S.Container>
  );
};

export default ShiftList;
