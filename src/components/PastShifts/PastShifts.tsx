import React from "react";
import ShiftList from "../ShiftList/ShiftList";
import { ShiftStatus } from "../../constants/shiftStatus";
import { Shift } from "../../types/shiftTypes";

interface PastShiftsProps {
  volunteerId: string;
}

const PastShifts: React.FC<PastShiftsProps> = (props) => {
  const { volunteerId } = props;
  const filterFn = (shift: Shift) => shift.status === ShiftStatus.Completed;

  return (
    <ShiftList
      volunteerId={volunteerId}
      title="היסטוריית משמרות"
      filterFn={filterFn}
      emptyMessage="אין משמרות קודמות"
    />
  );
};

export default PastShifts;
