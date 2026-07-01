import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getProducts,
} from "../api/productApi";
import {
  deleteProduct,
} from "../api/adminApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FarmerAnalytics from "../components/FarmerAnalytics";

function FarmerDashboard() {

  const [products, setProducts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
  try {
    const res = await getProducts();

    console.log("Logged User:", user.id);

    console.log("Products:", res.data);

    res.data.forEach((p) => {
      console.log(
        "Product:",
        p.name,
        "Farmer:",
        p.farmer,
        "Match:",
        String(p.farmer) === String(user.id)
      );
    });

    const myProducts = res.data.filter(
      (p) => String(p.farmer) === String(user.id)
    );

    console.log("Filtered:", myProducts);

    setProducts(myProducts);

  } catch (err) {
    console.log(err);
  }
};

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this product?")) return;

    try {

      await deleteProduct(id);

      toast.success("Product Deleted");

      loadProducts();

    } catch (err) {

      console.log(err);

      toast.error("Delete Failed");

    }

  };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2>My Products</h2>

          <Link
            to="/add-product"
            className="btn btn-success"
          >
            + Add Product
          </Link>

        </div>

        <div className="row">

          {products.length === 0 ? (

            <div className="text-center">

              <h4>No Products Added</h4>

            </div>

          ) : (

            products.map((product) => (

              <div
                className="col-md-4 mb-4"
                key={product._id}
              >

                <div className="card shadow h-100">

                  <img
                    src={product.image}
                    className="card-img-top"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                    alt={product.name}
                  />

                  <div className="card-body">

                    <h4>{product.name}</h4>

                    <p>{product.category}</p>

                    <h5 className="text-success">
                      ₹ {product.price}
                    </h5>

                    <p>

                      Stock :

                      <span
                        className={
                          product.stock <= 10
                            ? "text-danger fw-bold"
                            : "text-success fw-bold"
                        }
                      >

                        {" "}

                        {product.stock}

                      </span>

                    </p>

                    <div className="d-flex justify-content-between">

                      <Link
                        to={`/edit-product/${product._id}`}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleDelete(product._id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

       <FarmerAnalytics />

      <Footer />

    </>
  );
}

export default FarmerDashboard;