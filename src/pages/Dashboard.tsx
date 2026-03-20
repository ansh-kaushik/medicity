import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaHospital, FaCalendarCheck, FaUsers } from "react-icons/fa";
import { auth } from "../services/firebase";
import { logout } from "../services/auth";
import { usePatientStore } from "../store/patientStore";
import { requestPermission } from "../services/notificationService";

export default function Dashboard() {
  const navigate = useNavigate();
  const { patients } = usePatientStore();
  const user = auth.currentUser;
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  useEffect(() => { requestPermission(); }, []);

  const handleSignOut = async () => {
    await logout();
    navigate("/");
  };

  const todayStr = new Date().toISOString().split("T")[0];
  const todayAppts = patients.filter((p) => p.appointment_date === todayStr).length;

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Inter, sans-serif" }}>
      <nav className="bg-gradient-to-r from-blue-700 to-cyan-500 shadow-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaHospital className="text-white text-2xl" />
          <span className="text-white text-xl font-bold tracking-wide">MediCity</span>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-light btn-sm d-flex align-items-center gap-2 dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaUserCircle className="text-blue-600 fs-4" />
            <span className="d-none d-sm-inline text-sm font-medium">{displayName}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><span className="dropdown-item-text text-muted small">{user?.email}</span></li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button className="dropdown-item text-danger" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid px-3 py-4">
        <h2 className="fw-semibold text-gray-800 mb-1">Good day, {displayName}! 👋</h2>
        <p className="text-muted small mb-4">Here's what's happening at MediCity today.</p>

        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ borderLeft: "4px solid #3b82f6" }}>
              <div className="card-body">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <FaUsers className="text-blue-500" />
                  <span className="text-muted small">Total Patients</span>
                </div>
                <h3 className="fw-bold mb-0">{patients.length}</h3>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ borderLeft: "4px solid #06b6d4" }}>
              <div className="card-body">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <FaCalendarCheck className="text-cyan-500" />
                  <span className="text-muted small">Today's Appts</span>
                </div>
                <h3 className="fw-bold mb-0">{todayAppts}</h3>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ borderLeft: "4px solid #10b981" }}>
              <div className="card-body">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <FaHospital className="text-green-500" />
                  <span className="text-muted small">Active Records</span>
                </div>
                <h3 className="fw-bold mb-0">{patients.length}</h3>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ borderLeft: "4px solid #f59e0b" }}>
              <div className="card-body">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <FaCalendarCheck className="text-yellow-500" />
                  <span className="text-muted small">Upcoming</span>
                </div>
                <h3 className="fw-bold mb-0">{patients.length - todayAppts}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
            <div>
              <h5 className="fw-semibold mb-1">Patient Management</h5>
              <p className="text-muted small mb-0">View, search and manage all patient records.</p>
            </div>
            <button
              className="btn btn-primary d-flex align-items-center gap-2"
              onClick={() => navigate("/patients")}
            >
              <FaUsers /> View All Patients
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
