import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginUser(formData);

      if (res.success) {
        login(res.user, res.token);

        toast.success("Login Successful");

        // Role Based Redirect
        if (res.user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (res.user.role === "farmer") {
          navigate("/farmer-dashboard");
        } else {
          navigate("/consumer-dashboard");
        }
      }
    } catch (error) {
      toast.warning(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Login
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Email</label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">

            <label>Password</label>

            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          <button
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;