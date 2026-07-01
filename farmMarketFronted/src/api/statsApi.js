import axiosInstance from "../utils/axiosInstance";

export const getHomeStats = async () => {

  const products = await axiosInstance.get("/products");

  const users = await axiosInstance.get("/admin/users");

  const orders = await axiosInstance.get("/orders", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  return {
    products: products.data.data.length,
    users: users.data.data.length,
    orders: orders.data.data.length
  };

};