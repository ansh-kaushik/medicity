import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!email || !password) { setError("All fields are required."); return; }
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-center">
          <h1 className="text-white text-2xl font-bold tracking-wide">MediCity</h1>
          <p className="text-blue-100 text-sm mt-1">Healthcare Management</p>
        </div>

        <div className="p-6">
          <h2 className="text-gray-800 text-xl font-semibold mb-1">Welcome back</h2>
          <p className="text-gray-500 text-sm mb-5">Sign in to your account</p>

          <div className="mb-4">
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <div className="mb-5">
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <div className="mt-5 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
            <span className="font-semibold">Test credentials:</span><br />
            Email: <span className="font-mono">test@gmail.com</span><br />
            Password: <span className="font-mono">test1234</span>
          </div>
        </div>
      </div>
    </div>
  );
}
