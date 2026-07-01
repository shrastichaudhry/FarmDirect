import { useEffect, useState } from "react";
import { createOrder } from "../api/orderApi";
import {
  getCart,
  updateCartQuantity,
  removeCartItem,
  clearCart,
} from "../api/cartApi";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from "react-icons/fa";

function Cart() {
  const [cart, setCart] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getCart(user.id);
      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQty = async (item) => {
    try {
      await updateCartQuantity({
        user: user.id,
        product: item.product._id,
        quantity: item.quantity + 1,
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQty = async (item) => {
    try {
      if (item.quantity === 1) return;

      await updateCartQuantity({
        user: user.id,
        product: item.product._id,
        quantity: item.quantity - 1,
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await removeCartItem({
        user: user.id,
        product: productId,
      });

      fetchCart();

      toast.success("Product Removed");
    } catch (error) {
      console.log(error);
    }
  };

  const clearAll = async () => {
    try {
      await clearCart(user.id);

      fetchCart();

      toast.success("Cart Cleared");
    } catch (error) {
      console.log(error);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>Your Cart is Empty 🛒</h2>
      </div>
    );
  }

  const handleCheckout = async () => {
  try {

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.price,
    }));

    await createOrder({
      user: user.id,
      items: orderItems,
      totalAmount: cart.totalAmount,
    });

    await clearCart(user.id);

    toast.success("Order Placed Successfully 🎉");

    fetchCart();

  } catch (error) {
    console.log(error);
    toast.warning("Checkout Failed");
  }
};

  return (
  <>
    <Navbar />

    <div
      className="container py-5"
      style={{ minHeight: "80vh" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-5">

        <h2 className="fw-bold">
          <FaShoppingBag className="me-2 text-success" />
          Shopping Cart
        </h2>

        <button
          className="btn btn-outline-danger rounded-pill px-4"
          onClick={clearAll}
        >
          Clear Cart
        </button>

      </div>

      <div className="row">

        <div className="col-lg-8">

          {cart.items.map((item) => (

            <div
              className="card border-0 shadow-lg mb-4"
              style={{
                borderRadius: "18px",
              }}
              key={item.product._id}
            >

              <div className="row g-0">

                <div className="col-md-4">

                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="img-fluid"
                    style={{
                      height: "240px",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "18px 0 0 18px",
                    }}
                  />

                </div>

                <div className="col-md-8">

                  <div className="card-body h-100 d-flex flex-column">

                    <h4 className="fw-bold">
                      {item.product.name}
                    </h4>

                    <p className="text-muted">
                      {item.product.description}
                    </p>

                    <h3 className="text-success fw-bold">
                      ₹ {item.price}
                    </h3>

                    <div className="d-flex align-items-center mt-3">

                      <button
                        className="btn btn-outline-success rounded-circle"
                        onClick={() => decreaseQty(item)}
                      >
                        <FaMinus />
                      </button>

                      <span className="mx-4 fs-4 fw-bold">
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-success rounded-circle"
                        onClick={() => increaseQty(item)}
                      >
                        <FaPlus />
                      </button>

                    </div>

                    <button
                      className="btn btn-outline-danger rounded-pill mt-auto align-self-start px-4"
                      onClick={() =>
                        removeItem(item.product._id)
                      }
                    >
                      <FaTrash className="me-2" />
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

        <div className="col-lg-4">

          <div
            className="card border-0 shadow-lg sticky-top"
            style={{
              borderRadius: "20px",
              top: "100px",
            }}
          >

            <div className="card-body">

              <h3 className="fw-bold mb-4">
                Order Summary
              </h3>

              <hr />

              <div className="d-flex justify-content-between mb-3">

                <span>Total Items</span>

                <strong>
                  {cart.items.length}
                </strong>

              </div>

              <div className="d-flex justify-content-between mb-4">

                <span>Grand Total</span>

                <h4 className="text-success fw-bold">
                  ₹ {cart.totalAmount}
                </h4>

              </div>

              <button
                className="btn btn-success btn-lg rounded-pill w-100"
                onClick={handleCheckout}
              >
                Proceed To Checkout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

    <Footer />
  </>
);
}

export default Cart;