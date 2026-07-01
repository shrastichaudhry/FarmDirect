import axiosInstance from "../utils/axiosInstance";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const addToCart = async (data) => {
  const res = await axiosInstance.post("/cart/add", data, config);
  return res.data;
};

export const getCart = async (userId) => {
  const res = await axiosInstance.get(`/cart/${userId}`, config);
  return res.data;
};

export const updateCartQuantity = async (data) => {
  const res = await axiosInstance.put("/cart/update", data, config);
  return res.data;
};

export const removeCartItem = async (data) => {
  const res = await axiosInstance.delete("/cart/remove", {
    ...config,
    data,
  });
  return res.data;
};

export const clearCart = async (userId) => {
  const res = await axiosInstance.delete(
    `/cart/clear/${userId}`,
    config
  );

  return res.data;
};