import axiosInstance from "../utils/axiosInstance";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const createOrder = async (data) => {
  const res = await axiosInstance.post(
    "/orders",
    data,
    config
  );
  return res.data;
};


export const getOrders = async () => {
  const res = await axiosInstance.get("/orders", config);
  return res.data;
};

export const getAllOrders = async () => {
  const res = await axiosInstance.get("/orders", config);
  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await axiosInstance.delete(
    `/orders/${id}`,
    config
  );
  return res.data;
};