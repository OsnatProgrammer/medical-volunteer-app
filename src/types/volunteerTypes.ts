export interface Volunteer {
  id: string;
  name: string;
  phone: string;
  department: string[];
}

export type TabOption = "open" | "future" | "history" | "update";
