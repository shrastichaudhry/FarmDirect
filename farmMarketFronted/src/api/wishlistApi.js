import axiosInstance from "../utils/axiosInstance";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getWishlist = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const res = await axiosInstance.get(
    `/wishlist/${user.id}`,
    config
  );

  return res.data;
};

export const addToWishlist = async (productId) => {

  const user = JSON.parse(localStorage.getItem("user"));

  const res = await axiosInstance.post(
    "/wishlist/add",
    {
      user: user.id,
      product: productId,
    },
    config
  );

  return res.data;
};

export const removeWishlist = async (productId) => {

  const user = JSON.parse(localStorage.getItem("user"));

  const res = await axiosInstance.delete(
    "/wishlist/remove",
    {
      ...config,
      data: {
        user: user.id,
        product: productId,
      },
    }
  );

  return res.data;
};