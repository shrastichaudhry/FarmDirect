import axiosInstance from "../utils/axiosInstance";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getProfile = async () => {
  const res = await axiosInstance.get("/auth/profile", config);
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await axiosInstance.put(
    "/auth/profile",
    data,
    config
  );
  return res.data;
};