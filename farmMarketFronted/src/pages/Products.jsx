import { useEffect, useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaLeaf,
} from "react-icons/fa";

import { useNavigate, useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getProducts } from "../api/productApi";
import { addToCart } from "../api/cartApi";
import { addToWishlist } from "../api/wishlistApi";

import { toast } from "react-toastify";
import { useNotification } from "../context/NotificationContext";

function Products() {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { addNotification } = useNotification();

  const initialCategory =
    searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] =
    useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState(initialCategory);

  useEffect(() => {
    loadProducts();
  }, [searchParams]);

  const loadProducts = async () => {

    try {

      const res = await getProducts();

      setProducts(res.data);

      let list = [...res.data];

      const selectedCategory =
        searchParams.get("category");

      if (selectedCategory) {

        list = list.filter(
          (p) => p.category === selectedCategory
        );

        setCategory(selectedCategory);

      }

      setFilteredProducts(list);

    }

    catch (err) {

      console.log(err);

    }

  };

  const handleSearch = (value) => {

    setSearch(value);

    let list = [...products];

    if (value !== "") {

      list = list.filter((p) =>
        p.name
          .toLowerCase()
          .includes(value.toLowerCase())
      );

    }

    if (category !== "All") {

      list = list.filter(
        (p) => p.category === category
      );

    }

    setFilteredProducts(list);

  };

  const handleCategory = (value) => {

    setCategory(value);

    let list = [...products];

    if (value !== "All") {

      list = list.filter(
        (p) => p.category === value
      );

    }

    if (search !== "") {

      list = list.filter((p) =>
        p.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    }

    setFilteredProducts(list);

  };

  const handleCart = async (id) => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await addToCart({

        user: user.id,

        product: id,

        quantity: 1,

      });

      toast.success("Added to Cart");

      addNotification("Product added to Cart");

    }

    catch (err) {

      console.log(err);

    }

  };

  const handleWishlist = async (id) => {

    try {

      await addToWishlist(id);

      toast.success("Added to Wishlist");

      addNotification("Product added to Wishlist");

    }

    catch (err) {

      console.log(err);

    }

  };
  return (
  <>
    <Navbar />

    <div
      className="container py-5"
      style={{ minHeight: "80vh" }}
    >
      <div className="text-center mb-5">

        <h1 className="fw-bold text-success">
          🛒 Fresh Farm Products
        </h1>

        <p className="text-muted fs-5">
          Buy directly from trusted farmers
        </p>

      </div>

      {/* Search */}

      <div className="card border-0 shadow rounded-4 mb-5">

        <div className="card-body">

          <div className="row g-3">

            <div className="col-lg-8">

              <div className="input-group">

                <span className="input-group-text bg-success text-white">

                  <FaSearch />

                </span>

                <input
                  className="form-control"
                  placeholder="Search fresh products..."
                  value={search}
                  onChange={(e) =>
                    handleSearch(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="col-lg-4">

              <select
                className="form-select"
                value={category}
                onChange={(e) =>
                  handleCategory(e.target.value)
                }
              >

                <option>All</option>
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Dairy</option>
                <option>Grains</option>
                <option>Herbs</option>
                <option>Preserved</option>

              </select>

            </div>

          </div>

        </div>

      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h5>

          Showing

          <span className="text-success">

            {" "}
            {filteredProducts.length}

          </span>

          {" "}Products

        </h5>

      </div>

      <div className="row">

        {filteredProducts.map((product) => (

          <div
            className="col-lg-3 col-md-4 col-sm-6 mb-4"
            key={product._id}
          >

            <div
              className="card border-0 shadow h-100"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                transition: "0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 35px rgba(0,0,0,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "";
              }}
            >

              <div className="position-relative">

                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                  style={{
                    height: "240px",
                    objectFit: "cover",
                  }}
                  onClick={() =>
                    navigate(`/products/${product._id}`)
                  }
                />

                <span
                  className="badge bg-success position-absolute top-0 start-0 m-3 px-3 py-2"
                >
                  <FaLeaf /> Fresh
                </span>

                <button
                  className="btn btn-danger rounded-circle position-absolute top-0 end-0 m-3"
                  onClick={() =>
                    handleWishlist(product._id)
                  }
                >
                  <FaHeart />
                </button>

              </div>

              <div className="card-body">

                <h5
                  className="fw-bold"
                  style={{
                    minHeight: "55px",
                  }}
                >
                  {product.name}
                </h5>

                <p className="text-muted mb-2">

                  {product.category}

                </p>

                <h4 className="text-success fw-bold">

                  ₹ {product.price}

                </h4>

              </div>

              <div className="card-footer bg-white border-0">

                <button
                  className="btn btn-success w-100 rounded-pill mb-2"
                  onClick={() =>
                    handleCart(product._id)
                  }
                >
                  <FaShoppingCart />

                  {" "}Add To Cart

                </button>

                <button
                  className="btn btn-outline-success w-100 rounded-pill"
                  onClick={() =>
                    navigate(`/products/${product._id}`)
                  }
                >
                  View Details
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

    <Footer />
  </>
);
}
export default Products;