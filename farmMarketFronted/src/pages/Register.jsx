import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "consumer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(formData);

      if (res.success) {
        toast.success("Registration Successful");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Register
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="consumer">Consumer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>

          <button className="btn btn-success w-100">
            Register
          </button>

        </form>

      </div>
    </div>
  );
}

export default Register;