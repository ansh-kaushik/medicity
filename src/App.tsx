import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patient/:id" element={<PatientDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
