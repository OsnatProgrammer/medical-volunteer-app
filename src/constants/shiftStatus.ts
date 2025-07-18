export enum ShiftStatus {
  Planned = "Planned",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export const shiftStatusLabels: Record<ShiftStatus, string> = {
  [ShiftStatus.Planned]: "מתוכננת",
  [ShiftStatus.Completed]: "בוצעה",
  [ShiftStatus.Cancelled]: "בוטלה",
};
