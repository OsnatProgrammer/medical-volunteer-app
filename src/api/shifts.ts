import { Shift, ShiftFormData } from "../types/shiftTypes";

const ipc = window.require?.("electron").ipcRenderer;

export async function fetchShifts(): Promise<Shift[]> {
  if (!ipc) return [];
  const shifts = await ipc.invoke("getShifts");
  return shifts;
}

export async function saveShift(shift: ShiftFormData): Promise<Shift> {
  if (!ipc) throw new Error("IPC is not available");
  const saved: Shift = await ipc.invoke("saveShift", shift);
  return saved;
}

export async function updateShift(shift: Shift): Promise<Shift> {
  if (!ipc) throw new Error("IPC is not available");
  const updated = await ipc.invoke("updateShift", shift);
  return updated;
}
