import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {

    setNotifications((prev) => [
      {
        id: Date.now(),
        message,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );

};

export const useNotification = () => useContext(NotificationContext);