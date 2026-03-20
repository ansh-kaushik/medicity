import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle, FaHospital, FaArrowLeft, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { usePatientStore } from "../store/patientStore";
import { notify } from "../services/notificationService";

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients, updatePatient } = usePatientStore();
  const patient = patients.find((p) => p.id === id);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(patient || {});

  if (!patient) return (
    <div className="min-h-screen d-flex align-items-center justify-content-center">
      <div className="text-center">
        <p className="text-muted mb-3">Patient not found.</p>
        <button className="btn btn-primary" onClick={() => navigate("/patients")}>Back to Patients</button>
      </div>
    </div>
  );

  const handleSave = () => {
    updatePatient(id!, form as any);
    notify("Changes Saved", `${(form as any).name}'s details have been updated.`);
    setEditing(false);
  };

  const handleCancel = () => { setForm(patient); setEditing(false); };

  const fields = [
    { label: "Full Name", key: "name", type: "text" },
    { label: "Age", key: "age", type: "number" },
    { label: "Phone", key: "phone", type: "tel" },
    { label: "Address", key: "address", type: "text" },
    { label: "Condition", key: "condition", type: "text" },
    { label: "Appointment Date", key: "appointment_date", type: "date" },
    { label: "Appointment No", key: "appointment_no", type: "text" },
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Inter, sans-serif" }}>
      <nav className="bg-gradient-to-r from-blue-700 to-cyan-500 shadow-md px-4 py-3 flex items-center gap-3">
        <button className="text-white bg-transparent border-0 p-0" onClick={() => navigate("/patients")}>
          <FaArrowLeft className="text-xl" />
        </button>
        <FaHospital className="text-white text-2xl" />
        <span className="text-white font-bold text-lg">MediCity</span>
        <span className="text-blue-200 text-sm ms-1 d-none d-sm-inline">/ Patient Details</span>
      </nav>

      <div className="container py-4" style={{ maxWidth: 600 }}>
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 position-relative">
            <div className="position-absolute top-0 end-0 p-3">
              <FaUserCircle style={{ fontSize: "3rem" }} className="text-blue-300" />
            </div>

            <div className="mb-4 pe-5">
              <h4 className="fw-semibold mb-0">{patient.name}</h4>
              <small className="text-muted">ID: {patient.id} &bull; {patient.appointment_no}</small>
            </div>

            <div className="mb-3 d-flex gap-2">
              {!editing ? (
                <button className="btn btn-sm btn-primary d-flex align-items-center gap-1" onClick={() => setEditing(true)}>
                  <FaEdit /> Edit Details
                </button>
              ) : (
                <>
                  <button className="btn btn-sm btn-success d-flex align-items-center gap-1" onClick={handleSave}>
                    <FaSave /> Save Changes
                  </button>
                  <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1" onClick={handleCancel}>
                    <FaTimes /> Cancel
                  </button>
                </>
              )}
            </div>

            <div className="row g-3">
              {fields.map(({ label, key, type }) => (
                <div key={key} className="col-12 col-sm-6">
                  <label className="form-label small fw-medium text-muted mb-1">{label}</label>
                  {editing ? (
                    <input
                      type={type}
                      className="form-control form-control-sm"
                      value={(form as any)[key] ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    />
                  ) : (
                    <p className="mb-0 fw-medium">{(patient as any)[key] || <span className="text-muted">—</span>}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
