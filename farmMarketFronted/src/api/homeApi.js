import axiosInstance from "../utils/axiosInstance";

export const getFeaturedProducts = async () => {
  const res = await axiosInstance.get("/products");

  return res.data;
};