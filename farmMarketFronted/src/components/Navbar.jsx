import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import NotificationDropdown from "./NotificationDropdown";

function Navbar() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        background: "linear-gradient(90deg,#198754,#146c43)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
      }}
    >
      <div className="container">

        <Link
          className="navbar-brand fw-bold fs-3 text-white"
          to="/"
        >
          🌾 FarmDirect
        </Link>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbar"
        >

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item mx-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                isActive
                ? "nav-link text-warning fw-bold"
                : "nav-link text-white fw-semibold"
                }
              >
                  Home
              </NavLink>
            </li>

            <li className="nav-item mx-2">
              <NavLink
  to="/products"
  className={({ isActive }) =>
    isActive
      ? "nav-link text-warning fw-bold"
      : "nav-link text-white fw-semibold"
  }
>
  Products
</NavLink>
            </li>

            {user?.role === "consumer" && (
              <>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link text-white fw-semibold"
                    to="/my-orders"
                  >
                    My Orders
                  </Link>
                </li>

                <li className="nav-item mx-2">
                  <Link
                    className="text-white fs-5"
                    to="/wishlist"
                  >
                    <FaHeart />
                  </Link>
                </li>

                <li className="nav-item mx-2">
                  <Link
                    className="text-white fs-5"
                    to="/cart"
                  >
                    <FaShoppingCart />
                  </Link>
                </li>
              </>
            )}

            {user?.role === "farmer" && (
              <li className="nav-item mx-2">
                <Link
                  className="nav-link text-white fw-semibold"
                  to="/farmer-dashboard"
                >
                  Farmer Dashboard
                </Link>
              </li>
            )}

            {user?.role === "consumer" && (
              <li className="nav-item mx-2">
                <NavLink
  to="/consumer-dashboard"
  className={({ isActive }) =>
    isActive
      ? "nav-link text-warning fw-bold"
      : "nav-link text-white fw-semibold"
  }
>
  Dashboard
</NavLink>
              </li>
            )}

            {user?.role === "admin" && (
              <li className="nav-item mx-2">
                <Link
                  className="nav-link text-white fw-semibold"
                  to="/admin-dashboard"
                >
                  Admin
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item mx-2">
                <NotificationDropdown />
              </li>
            )}

            {user ? (
              <>
                <li className="nav-item mx-2">

                  <Link
                    to="/profile"
                    className="text-white fs-3"
                  >
                    <FaUserCircle />
                  </Link>

                </li>

                <li className="nav-item ms-2">

                  <button
                    className="btn btn-warning rounded-pill px-4 fw-bold"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-2">

                  <Link
                    className="btn btn-outline-light rounded-pill px-4"
                    to="/login"
                  >
                    Login
                  </Link>

                </li>

                <li className="nav-item">

                  <Link
                    className="btn btn-warning rounded-pill px-4 fw-bold"
                    to="/register"
                  >
                    Register
                  </Link>

                </li>
              </>
            )}

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;