import { Volunteer } from "../types/volunteerTypes";

const ipc = window.require?.("electron").ipcRenderer;

export async function fetchVolunteers(): Promise<Volunteer[]> {
  if (!ipc) return [];
  const volunteers = await ipc.invoke("getVolunteers");
  return volunteers;
}

export async function saveVolunteers(volunteers: Volunteer[]): Promise<void> {
  if (!ipc) return;
  await ipc.invoke("saveVolunteers", volunteers);
}
