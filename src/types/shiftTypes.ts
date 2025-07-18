import { ShiftStatus } from "../constants/shiftStatus";

export interface ShiftFormData {
  date: string;
  startTime: string;
  endTime: string;
  department: string;
  volunteerId?: string | null;
  status: ShiftStatus;
  description?: string;
}

export interface Shift extends ShiftFormData {
  id: string;
}

export interface ShiftEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: ShiftStatus;
}

export const mapShiftToShiftEvent = (shifts: Shift[]): ShiftEvent[] =>
  shifts.map((shift) => ({
    id: shift.id,
    title: shift.department,
    start: new Date(`${shift.date}T${shift.startTime}`),
    end: new Date(`${shift.date}T${shift.endTime}`),
    status: shift.status ?? ShiftStatus.Planned,
  }));
