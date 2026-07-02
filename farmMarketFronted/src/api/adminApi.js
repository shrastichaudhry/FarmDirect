import axiosInstance from "../utils/axiosInstance";

export const getAdminDashboard = async () => {
  const token = localStorage.getItem("token");

  const response = await axiosInstance.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await axiosInstance.get("/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAllProducts = async () => {
  const token = localStorage.getItem("token");

  const response = await axiosInstance.get("/admin/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAllOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await axiosInstance.get("/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createProduct = async (formData) => {

  const token = localStorage.getItem("token");

  const response = await axiosInstance.post(
    "/products",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateProduct = async (id, productData) => {
  const token = localStorage.getItem("token");

  const response = await axiosInstance.put(
    `/products/${id}`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axiosInstance.delete(
    `/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};