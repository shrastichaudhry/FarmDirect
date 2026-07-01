import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axiosInstance from "../utils/axiosInstance";
import { updateProduct } from "../api/adminApi";
import { toast } from "react-toastify";
import { useNotification } from "../context/NotificationContext";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "Vegetables",
    price: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {

    try {

      const res = await axiosInstance.get(`/products/${id}`);

      setProduct(res.data.data);

    } catch (err) {

      console.log(err);

      toast.error("Unable to load product");

    }

  };

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateProduct(id, {
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        stock: product.stock,
        image: product.image,
      });

      toast.success("Product Updated Successfully");
      addNotification("Product updated");

      navigate("/farmer-dashboard");

    } catch (err) {

      console.log(err);

      toast.warning("Update Failed");

    }

  };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div
          className="card shadow mx-auto"
          style={{ maxWidth: "700px" }}
        >

          <div className="card-header bg-primary text-white">
            <h3>Edit Product</h3>
          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label>Product Name</label>

                <input
                  className="form-control"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                />

              </div>

              <div className="mb-3">

                <label>Description</label>

                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                />

              </div>

              <div className="mb-3">

                <label>Category</label>

                <select
                  className="form-select"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                >
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Dairy</option>
                  <option>Grains</option>
                  <option>Herbs</option>
                  <option>Preserved</option>
                </select>

              </div>

              <div className="row">

                <div className="col-md-6">

                  <label>Price</label>

                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6">

                  <label>Stock</label>

                  <input
                    type="number"
                    className="form-control"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="mt-3">

                <label>Image URL</label>

                <input
                  className="form-control"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                />

              </div>

              <button
                className="btn btn-primary w-100 mt-4"
              >
                Update Product
              </button>

            </form>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default EditProduct;