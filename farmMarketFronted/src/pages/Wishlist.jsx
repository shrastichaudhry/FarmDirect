import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getWishlist,
  removeWishlist,
} from "../api/wishlistApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Wishlist() {

  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {

    const res = await getWishlist();

    setWishlist(res.data.products);

  };

  const remove = async (id) => {

    await removeWishlist(id);

    fetchWishlist();

  };

  if (wishlist.length === 0) {

    return (

      <div className="container mt-5 text-center">

        <h2>No Wishlist Items ❤️</h2>

      </div>

    );

  }

  return (
  <>
    <Navbar />

    <div
      className="container py-5"
      style={{ minHeight: "80vh" }}
    >
      <div className="text-center mb-5">

        <h1 className="fw-bold text-danger">
          ❤️ My Wishlist
        </h1>

        <p className="text-muted fs-5">
          Save your favourite farm products for later.
        </p>

      </div>

      {wishlist.length === 0 ? (

        <div className="text-center py-5">

          <div style={{ fontSize: "90px" }}>
            ❤️
          </div>

          <h3 className="mt-3">
            Your Wishlist is Empty
          </h3>

          <p className="text-muted">
            Browse products and add your favourites.
          </p>

          <button
            className="btn btn-success rounded-pill px-5"
            onClick={() => navigate("/products")}
          >
            Explore Products
          </button>

        </div>

      ) : (

        <div className="row">

          {wishlist.map((product) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={product._id}
            >

              <div
                className="card border-0 shadow-lg h-100"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >

                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    height: "260px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(`/products/${product._id}`)
                  }
                />

                <div className="card-body">

                  <h4 className="fw-bold">
                    {product.name}
                  </h4>

                  <p className="text-muted">
                    {product.description}
                  </p>

                  <h3 className="text-success fw-bold">
                    ₹ {product.price}
                  </h3>

                </div>

                <div className="card-footer bg-white border-0">

                  <div className="d-grid gap-2">

                    <button
                      className="btn btn-success"
                      onClick={() =>
                        navigate(`/products/${product._id}`)
                      }
                    >
                      View Product
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      onClick={() =>
                        remove(product._id)
                      }
                    >
                      Remove from Wishlist
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

    <Footer />
  </>
);

}

export default Wishlist;