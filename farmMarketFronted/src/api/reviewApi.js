import axiosInstance from "../utils/axiosInstance";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getReviews = async (productId) => {

  const res = await axiosInstance.get(
    `/reviews/${productId}`
  );

  return res.data;

};

export const addReview = async (data) => {

  const res = await axiosInstance.post(
    "/reviews",
    data,
    config
  );

  return res.data;

};