import React from "react";
import ShiftList from "../ShiftList/ShiftList";
import { ShiftStatus } from "../../constants/shiftStatus";
import { Shift } from "../../types/shiftTypes";

interface FutureShiftsProps {
  volunteerId: string;
}

const FutureShifts: React.FC<FutureShiftsProps> = (props) => {
  const { volunteerId } = props;

  const filterFn = (shift: Shift) => {
    if (!shift.date || !shift.startTime) return false;
    const shiftDateTime = new Date(`${shift.date}T${shift.startTime}`);
    if (isNaN(shiftDateTime.getTime())) return false;
    return shift.status === ShiftStatus.Planned && shiftDateTime >= new Date();
  };

  return (
    <ShiftList
      volunteerId={volunteerId}
      title="משמרות עתידיות"
      filterFn={filterFn}
      emptyMessage="אין משמרות עתידיות"
      allowCancel={true}
    />
  );
};

export default FutureShifts;
