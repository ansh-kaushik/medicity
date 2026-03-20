import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaHospital, FaTh, FaList, FaPlus, FaSearch, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { usePatientStore } from "../store/patientStore";
import type { Patient } from "../store/patientStore";
import { notify } from "../services/notificationService";

export default function Patients() {
  const { patients, view, setView, addPatient } = usePatientStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", address: "", phone: "", condition: "", appointment_date: "", appointment_no: "" });

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.appointment_no.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name || !form.phone) return;
    const newP: Patient = {
      id: Date.now().toString(),
      name: form.name,
      age: parseInt(form.age) || 0,
      address: form.address,
      phone: form.phone,
      condition: form.condition,
      appointment_date: form.appointment_date,
      appointment_no: form.appointment_no || `APT${Date.now().toString().slice(-4)}`,
    };
    addPatient(newP);
    notify("Patient Added", `${newP.name} has been added successfully.`);
    setShowModal(false);
    setForm({ name: "", age: "", address: "", phone: "", condition: "", appointment_date: "", appointment_no: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Inter, sans-serif" }}>
      <nav className="bg-gradient-to-r from-blue-700 to-cyan-500 shadow-md px-4 py-3 flex items-center gap-3">
        <button className="text-white me-1 bg-transparent border-0 p-0" onClick={() => navigate("/dashboard")}>
          <FaHospital className="text-2xl" />
        </button>
        <span className="text-white font-bold text-lg">MediCity</span>
        <span className="text-blue-200 text-sm ms-1 d-none d-sm-inline">/ Patients</span>
      </nav>

      <div className="container-fluid px-3 py-4">
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3 mb-4">
          <h4 className="fw-semibold text-gray-800 mb-0">All Patients</h4>
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowModal(true)}>
            <FaPlus /> Add Patient
          </button>
        </div>

        <div className="d-flex flex-column flex-sm-row gap-2 mb-4">
          <div className="input-group flex-grow-1">
            <span className="input-group-text bg-white border-end-0"><FaSearch className="text-muted" /></span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Search by name or appointment no…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="btn-group">
            <button className={`btn btn-sm ${view === "grid" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setView("grid")}>
              <FaTh />
            </button>
            <button className={`btn btn-sm ${view === "list" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setView("list")}>
              <FaList />
            </button>
          </div>
        </div>

        {filtered.length === 0 && (
          <p className="text-muted text-center py-5">No patients found.</p>
        )}

        {view === "grid" && (
          <div className="row g-3">
            {filtered.map((p) => (
              <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div
                  className="card border-0 shadow-sm h-100 cursor-pointer"
                  style={{ cursor: "pointer", transition: "transform 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                  onClick={() => navigate(`/patient/${p.id}`)}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <FaUserCircle className="text-4xl text-blue-400 flex-shrink-0" style={{ fontSize: "2.5rem" }} />
                      <div className="overflow-hidden">
                        <h6 className="mb-0 fw-semibold text-truncate">{p.name}</h6>
                        <small className="text-muted">Age {p.age}</small>
                      </div>
                    </div>
                    <p className="mb-1 small d-flex align-items-center gap-1">
                      <FaPhone className="text-green-500" /><span className="text-muted">{p.phone}</span>
                    </p>
                    <p className="mb-1 small d-flex align-items-center gap-1 text-truncate">
                      <FaMapMarkerAlt className="text-red-400 flex-shrink-0" /><span className="text-muted text-truncate">{p.address}</span>
                    </p>
                    <p className="mb-1 small d-flex align-items-center gap-1">
                      <FaCalendarAlt className="text-blue-400" /><span className="text-muted">{p.appointment_date}</span>
                    </p>
                    <div className="mt-2">
                      <span className="badge bg-primary bg-opacity-10 text-primary">{p.appointment_no}</span>
                      <span className="badge bg-warning bg-opacity-10 text-warning ms-1">{p.condition}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === "list" && (
          <div className="d-flex flex-column gap-2">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="card border-0 shadow-sm"
                style={{ cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f9ff")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                onClick={() => navigate(`/patient/${p.id}`)}
              >
                <div className="card-body py-3 d-flex align-items-center gap-3">
                  <FaUserCircle style={{ fontSize: "2.2rem" }} className="text-blue-400 flex-shrink-0" />
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="d-flex flex-wrap align-items-center gap-2">
                      <span className="fw-semibold">{p.name}</span>
                      <span className="badge bg-primary bg-opacity-10 text-primary small">{p.appointment_no}</span>
                      <span className="badge bg-warning bg-opacity-10 text-warning small">{p.condition}</span>
                    </div>
                    <div className="d-flex flex-wrap gap-3 mt-1">
                      <small className="text-muted"><FaPhone className="me-1 text-green-500" />{p.phone}</small>
                      <small className="text-muted"><FaCalendarAlt className="me-1 text-blue-400" />{p.appointment_date}</small>
                    </div>
                  </div>
                  <small className="text-muted d-none d-md-block text-truncate" style={{ maxWidth: 160 }}>{p.address}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }} onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-semibold">Add New Patient</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                {[
                  { label: "Full Name *", key: "name", type: "text", placeholder: "e.g. Ram" },
                  { label: "Age", key: "age", type: "number", placeholder: "e.g. 30" },
                  { label: "Phone *", key: "phone", type: "tel", placeholder: "10-digit number" },
                  { label: "Address", key: "address", type: "text", placeholder: "Street, City" },
                  { label: "Condition", key: "condition", type: "text", placeholder: "e.g. Flu, Diabetes" },
                  { label: "Appointment Date", key: "appointment_date", type: "date", placeholder: "" },
                  { label: "Appointment No", key: "appointment_no", type: "text", placeholder: "e.g. APT006" },
                ].map(({ label, key, type, placeholder }) => (
                  <div className="mb-3" key={key}>
                    <label className="form-label small fw-medium">{label}</label>
                    <input
                      type={type}
                      className="form-control form-control-sm"
                      placeholder={placeholder}
                      value={(form as any)[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
              <div className="modal-footer border-0 pt-0">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-sm btn-primary" onClick={handleAdd}>Add Patient</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
