import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createProduct } from "../api/adminApi";
import { toast } from "react-toastify";
import { useNotification } from "../context/NotificationContext";

function AddProducts() {

  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [image, setImage] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "Vegetables",
    price: "",
    stock: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("image", image);

    await createProduct(formData);

    toast.success("Product Added Successfully");

    addNotification("New product added");

    navigate("/farmer-dashboard");

  } catch (err) {

    console.log(err);

    toast.error("Unable to Add Product");

  }

};

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="card shadow mx-auto" style={{ maxWidth: "700px" }}>

          <div className="card-header bg-success text-white">

            <h3 className="mb-0">Add New Product</h3>

          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label className="form-label">
                  Product Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Description
                </label>

                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Category
                </label>

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

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Price
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Stock
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              <div className="mb-4">

                <label className="form-label">
                  Image URL
                </label>

                <input
                  type="file"
                  className="form-control"
                  name="image"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />

              </div>

              <button
                className="btn btn-success w-100"
                type="submit"
              >
                Add Product
              </button>

            </form>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default AddProducts;