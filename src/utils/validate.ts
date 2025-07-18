import dayjs from "dayjs";
import { ShiftFormData } from "../types/shiftTypes";


export function isValidIsraeliID(id: string): boolean {
  id = id.trim();
  if (!/^\d{5,9}$/.test(id)) return false;

  id = id.padStart(9, '0');

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    let num = Number(id[i]) * ((i % 2) + 1);
    if (num > 9) num -= 9;
    sum += num;
  }

  return sum % 10 === 0;
}

export function validateShift(formData: ShiftFormData) {
  const errors: Partial<Record<keyof ShiftFormData, string>> = {};
  const now = dayjs();

  if (!formData.date) {
    errors.date = "נא לבחור תאריך למשמרת.";
  } else {
    const selectedDate = dayjs(formData.date);
    if (selectedDate.isBefore(now, "day")) {
      errors.date = "לא ניתן לקבוע משמרת לתאריך שחלף.";
    }
  }

  if (!formData.startTime) {
    errors.startTime = "נא לבחור שעת התחלה.";
  }

  if (!formData.endTime) {
    errors.endTime = "נא לבחור שעת סיום.";
  }

  if (formData.date && formData.startTime && formData.endTime) {
    const startDateTime = dayjs(`${formData.date}T${formData.startTime}`);
    const endDateTime = dayjs(`${formData.date}T${formData.endTime}`);
    if (endDateTime.isBefore(startDateTime) || endDateTime.isSame(startDateTime)) {
      errors.endTime = "שעת הסיום חייבת להיות מאוחרת משעת ההתחלה.";
    }
  }

  if (!formData.department) {
    errors.department = "נא לבחור מחלקה.";
  }

  return errors;
}

