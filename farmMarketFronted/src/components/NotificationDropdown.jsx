import { FaBell } from "react-icons/fa";
import { useNotification } from "../context/NotificationContext";

function NotificationDropdown() {
  const { notifications } = useNotification();

  return (
    <div className="dropdown">

      <button
        className="btn btn-success position-relative"
        data-bs-toggle="dropdown"
      >
        <FaBell size={20} />

        {notifications.length > 0 && (
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {notifications.length}
          </span>
        )}
      </button>

      <ul
        className="dropdown-menu dropdown-menu-end"
        style={{ width: "350px" }}
      >

        <li>
          <h6 className="dropdown-header">
            Notifications
          </h6>
        </li>

        {notifications.length === 0 ? (
          <li className="dropdown-item text-muted">
            No Notifications
          </li>
        ) : (
          notifications.map((item) => (
            <li
              key={item.id}
              className="dropdown-item border-bottom"
            >
              <div>{item.message}</div>

              <small className="text-muted">
                {item.time}
              </small>
            </li>
          ))
        )}

      </ul>

    </div>
  );
}

export default NotificationDropdown;