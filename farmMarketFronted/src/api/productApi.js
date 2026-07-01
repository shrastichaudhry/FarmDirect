import axiosInstance from "../utils/axiosInstance";

export const getProducts = async (
  search = "",
  category = "",
  minPrice = "",
  maxPrice = "",
  sort = ""
) => {

  const response = await axiosInstance.get("/products", {
    params: {
      search,
      category,
      minPrice,
      maxPrice,
      sort,
    },
  });



  return response.data;
};

export const getSingleProduct = async (id) => {

  const response = await axiosInstance.get(`/products/${id}`);

  return response.data;

};

export const getRelatedProducts = async () => {

  const response = await axiosInstance.get("/products");

  return response.data;

};