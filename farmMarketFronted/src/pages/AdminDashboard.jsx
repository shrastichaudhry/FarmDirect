import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

import {
  getAdminDashboard,
  getAllUsers,
  getAllProducts,
  getAllOrders,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/adminApi";

function AdminDashboard() {

  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "Vegetables",
    price: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      const dashboard = await getAdminDashboard();

      const allUsers = await getAllUsers();

      const allProducts = await getAllProducts();

      const allOrders = await getAllOrders();

      setStats(dashboard.data);

      setUsers(allUsers.data);

      setProducts(allProducts.data);

      setOrders(allOrders.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {

    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });

  };

  const handleAdd = () => {

    setEditingProduct(null);

    setProductData({
      name: "",
      description: "",
      category: "Vegetables",
      price: "",
      stock: "",
      image: "",
    });

    setShowModal(true);

  };

  const handleEdit = (product) => {

    setEditingProduct(product);

    setProductData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });

    setShowModal(true);

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      alert("Product Deleted Successfully");

      fetchData();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingProduct) {

        await updateProduct(
          editingProduct._id,
          productData
        );

        alert("Product Updated Successfully");

      } else {

        await createProduct(productData);

        alert("Product Added Successfully");

      }

      setShowModal(false);

      fetchData();

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

  };

  return (
    <div className="container py-4">

  <h2 className="mb-4">Admin Dashboard</h2>

  <div className="row mb-4">

    <div className="col-md-3 mb-3">
      <div className="card shadow text-center p-3">
        <h6>Total Users</h6>
        <h3>{stats.totalUsers}</h3>
      </div>
    </div>

    <div className="col-md-3 mb-3">
      <div className="card shadow text-center p-3">
        <h6>Total Farmers</h6>
        <h3>{stats.totalFarmers}</h3>
      </div>
    </div>

    <div className="col-md-3 mb-3">
      <div className="card shadow text-center p-3">
        <h6>Total Consumers</h6>
        <h3>{stats.totalConsumers}</h3>
      </div>
    </div>

    <div className="col-md-3 mb-3">
      <div className="card shadow text-center p-3">
        <h6>Total Products</h6>
        <h3>{stats.totalProducts}</h3>
      </div>
    </div>

  </div>

  {/* USERS */}

  <div className="card shadow mb-4">

    <div className="card-header bg-success text-white">
      All Users
    </div>

    <div className="table-responsive">

      <table className="table table-bordered table-hover">

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

  {/* PRODUCTS */}

  <div className="card shadow mb-4">

    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">

      <h5 className="mb-0">
        Products
      </h5>

      <button
        className="btn btn-light btn-sm"
        onClick={handleAdd}
      >
        <FaPlus /> Add Product
      </button>

    </div>

    <div className="table-responsive">

      <table className="table table-bordered table-hover">

        <thead>

          <tr>

            <th>Image</th>

            <th>Name</th>

            <th>Category</th>

            <th>Price</th>

            <th>Stock</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product._id}>

              <td>

                <img
                  src={product.image}
                  alt=""
                  width="70"
                  height="70"
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

              </td>

              <td>{product.name}</td>

              <td>{product.category}</td>

              <td>₹ {product.price}</td>

              <td>{product.stock}</td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(product)}
                >
                  <FaEdit />
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product._id)}
                >
                  <FaTrash />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

  {/* ORDERS */}

  <div className="card shadow mb-4">

    <div className="card-header bg-warning">

      Orders

    </div>

    <div className="table-responsive">

      <table className="table table-bordered table-hover">

        <thead>

          <tr>

            <th>Consumer</th>

            <th>Farmer</th>

            <th>Status</th>

            <th>Total</th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order._id}>

              <td>{order.consumer?.name}</td>

              <td>{order.farmer?.name}</td>

              <td>{order.status}</td>

              <td>₹ {order.totalAmount}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>
    {/* ADD / EDIT PRODUCT MODAL */}

  {showModal && (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h5>

            <button
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="modal-body">

              <div className="mb-3">

                <label className="form-label">
                  Product Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={productData.name}
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
                  value={productData.description}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Category
                  </label>

                  <select
                    className="form-select"
                    name="category"
                    value={productData.category}
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

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Price
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Stock
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Image URL
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="image"
                    value={productData.image}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {productData.image && (
                <div className="text-center">

                  <img
                    src={productData.image}
                    alt="Preview"
                    width="180"
                    style={{
                      borderRadius: "10px",
                    }}
                  />

                </div>
              )}

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-success"
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  )}

</div>
);
}

export default AdminDashboard;