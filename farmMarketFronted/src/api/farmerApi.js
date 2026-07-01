import axiosInstance from "../utils/axiosInstance";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getMyProducts = async () => {
  const res = await axiosInstance.get("/products", config);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axiosInstance.post(
    "/products",
    data,
    config
  );
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axiosInstance.put(
    `/products/${id}`,
    data,
    config
  );
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(
    `/products/${id}`,
    config
  );
  return res.data;
};