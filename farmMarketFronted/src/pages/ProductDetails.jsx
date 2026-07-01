import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getSingleProduct, getRelatedProducts} from "../api/productApi";
import { addToCart } from "../api/cartApi";
import { addToWishlist } from "../api/wishlistApi";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../api/orderApi";
import ReviewSection from "../components/ReviewSection";
import { toast } from "react-toastify";
import { useNotification } from "../context/NotificationContext";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const { addNotification } = useNotification();

  useEffect(() => {
    loadProduct();
    loadRelated();
  }, [id]);

  const loadProduct = async () => {

    try {

      const res = await getSingleProduct(id);

      setProduct(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const loadRelated = async () => {

  try {

    const res = await getRelatedProducts();

    setRelatedProducts(res.data.slice(0, 4));

  } catch (err) {

    console.log(err);

  }

};

  const handleCart = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    await addToCart({
      user: user.id,
      product: product._id,
      quantity,
    });

    toast.success("Product added to Cart");

    addNotification(`${product.name} added to Cart`);

  };

  const handleWishlist = async () => {
  try {
    await addToWishlist(product._id);

    toast.success("Added to Wishlist");

    addNotification(`${product.name} added to Wishlist`);

  } catch (err) {
    console.log(err);

    toast.error(
      err.response?.data?.message || "Unable to add to wishlist"
    );
  }
};

  const handleBuyNow = async () => {

  try {

    const user = JSON.parse(localStorage.getItem("user"));

    await createOrder({

      user: user.id,

      items: [
        {
          product: product._id,
          quantity,
          price: product.price,
        },
      ],

      totalAmount: quantity * product.price,

    });

    toast.success("Order Placed Successfully");
    addNotification(`Order placed for ${product.name}`);

    navigate("/consumer-dashboard");

  } catch (err) {

    console.log(err);

    toast.error("Unable to place order");

  }

};

  if (!product) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <>
      <Navbar />
       <div className="container py-5">

  <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

    <div className="row g-0">

      <div className="col-lg-5 position-relative">

        <img
          src={product.image}
          alt={product.name}
          className="img-fluid w-100"
          style={{
            height: "100%",
            minHeight: "500px",
            objectFit: "cover",
          }}
        />

        <span className="badge bg-success position-absolute top-0 start-0 m-3 px-3 py-2">
          🌿 Farm Fresh
        </span>

      </div>

      <div className="col-lg-7">

        <div className="p-5">

          <h1 className="fw-bold mb-3">
            {product.name}
          </h1>

          <span className="badge bg-light text-success fs-6 mb-3">
            {product.category}
          </span>

          <h2 className="text-success fw-bold mb-4">
            ₹ {product.price}
          </h2>

          <p
            className="text-secondary"
            style={{
              lineHeight: "1.9",
              fontSize: "17px",
            }}
          >
            {product.description}
          </p>

          <div className="row mt-4">

            <div className="col-md-6">

              <div className="card bg-light border-0">

                <div className="card-body">

                  <h6 className="text-muted">
                    Category
                  </h6>

                  <h5 className="text-success">
                    {product.category}
                  </h5>

                </div>

              </div>

            </div>

            <div className="col-md-6">

              <div className="card bg-light border-0">

                <div className="card-body">

                  <h6 className="text-muted">
                    Stock Available
                  </h6>

                  <h5 className="text-primary">
                    {product.stock}
                  </h5>

                </div>

              </div>

            </div>

          </div>

          <div className="mt-4">

            <label className="fw-bold me-3">
              Quantity
            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value))
              }
              className="form-control d-inline-block"
              style={{
                width: "120px",
              }}
            />

          </div>

          <div className="d-grid gap-3 mt-5">

            <button
              className="btn btn-success btn-lg rounded-pill"
              onClick={handleCart}
            >
              <FaShoppingCart /> Add To Cart
            </button>

            <button
              className="btn btn-primary btn-lg rounded-pill"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>

            <button
              className="btn btn-outline-danger btn-lg rounded-pill"
              onClick={handleWishlist}
            >
              <FaHeart /> Add To Wishlist
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>

  <div className="mt-5">

    <h2 className="fw-bold mb-4">
      Related Products
    </h2>

    <div className="row">

      {relatedProducts
        .filter((p) => p._id !== product._id)
        .slice(0, 4)
        .map((item) => (

          <div
            className="col-lg-3 col-md-6 mb-4"
            key={item._id}
          >

            <div
              className="card border-0 shadow h-100"
              style={{
                cursor: "pointer",
                borderRadius: "18px",
                transition: ".3s",
              }}
              onClick={() =>
                navigate(`/products/${item._id}`)
              }
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(-8px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(0px)")
              }
            >

              <img
                src={item.image}
                className="card-img-top"
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
                alt={item.name}
              />

              <div className="card-body">

                <h5 className="fw-bold">
                  {item.name}
                </h5>

                <p className="text-muted">
                  {item.category}
                </p>

                <h4 className="text-success">
                  ₹ {item.price}
                </h4>

              </div>

            </div>

          </div>

        ))}

    </div>

  </div>

  <ReviewSection />

</div>
      

      

      <Footer />

    </>
  );
}

export default ProductDetails;