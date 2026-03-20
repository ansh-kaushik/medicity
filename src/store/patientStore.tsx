import { create } from "zustand";

export type Patient = {
  id: string;
  name: string;
  age: number;
  address: string;
  phone: string;
  condition: string;
  appointment_date: string;
  appointment_no: string;
};

type State = {
  patients: Patient[];
  view: "grid" | "list";
  setView: (v: "grid" | "list") => void;
  addPatient: (p: Patient) => void;
  updatePatient: (id: string, data: Partial<Patient>) => void;
};

export const usePatientStore = create<State>((set) => ({
  patients: [
    { id: "1", name: "Shankar Kumar", age: 30, address: "12 Main St, Patna", phone: "9876543210", condition: "Flu", appointment_date: "2026-03-22", appointment_no: "APT001" },
    { id: "2", name: "Sara Khan", age: 25, address: "45 Park Ave, Mumbai", phone: "9123456780", condition: "Fever", appointment_date: "2026-03-23", appointment_no: "APT002" },
    { id: "3", name: "Amit Singh", age: 40, address: "78 Gandhi Rd, Bangalore", phone: "9988776655", condition: "Diabetes", appointment_date: "2026-03-24", appointment_no: "APT003" },
    { id: "4", name: "Priya Sharma", age: 35, address: "9 Nehru Nagar, Pune", phone: "8877665544", condition: "Hypertension", appointment_date: "2026-03-25", appointment_no: "APT004" },
    { id: "5", name: "Ravi Kumar", age: 52, address: "22 Station Rd, Chennai", phone: "7766554433", condition: "Asthma", appointment_date: "2026-03-26", appointment_no: "APT005" },
  ],
  view: "grid",
  setView: (v) => set({ view: v }),
  addPatient: (p) => set((s) => ({ patients: [...s.patients, p] })),
  updatePatient: (id, data) =>
    set((s) => ({
      patients: s.patients.map((p) => (p.id === id ? { ...p, ...data } : p)),
    })),
}));
