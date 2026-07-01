import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getOrders } from "../api/orderApi";
import InvoiceButton from "../components/InvoiceButton";

function MyOrders() {

  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    try {

      const res = await getOrders();

      const myOrders = res.data.filter(
        order => order.user?._id === user.id
      );

      setOrders(myOrders);

    } catch (err) {

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
          📦 My Orders
        </h1>

        <p className="text-muted fs-5">
          Track all your purchases in one place
        </p>

      </div>

      {orders.length === 0 ? (

        <div className="text-center py-5">

          <div style={{ fontSize: "90px" }}>
            📭
          </div>

          <h3 className="mt-3">
            No Orders Found
          </h3>

          <p className="text-muted">
            Start shopping fresh products today.
          </p>

          <button
            className="btn btn-success rounded-pill px-5"
            onClick={() => window.location.href = "/products"}
          >
            Shop Now
          </button>

        </div>

      ) : (

        orders.map((order) => (

          <div
            key={order._id}
            className="card border-0 shadow-lg mb-5"
            style={{
              borderRadius: "20px",
            }}
          >

            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

                <div>

                  <h4 className="fw-bold mb-1">
                    Order
                  </h4>

                  <small className="text-muted">
                    #{order._id}
                  </small>

                </div>

                <div>

                  <span className="badge bg-success fs-6 px-3 py-2">
                    {order.status}
                  </span>

                </div>

              </div>

              <div className="row">

                {order.items.map((item) => (

                  <div
                    key={item._id}
                    className="col-lg-6 mb-4"
                  >

                    <div
                      className="card border-0 bg-light"
                      style={{
                        borderRadius: "15px",
                      }}
                    >

                      <div className="card-body">

                        <div className="d-flex">

                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            style={{
                              width: "110px",
                              height: "110px",
                              objectFit: "cover",
                              borderRadius: "12px",
                            }}
                          />

                          <div className="ms-4">

                            <h5 className="fw-bold">
                              {item.product.name}
                            </h5>

                            <p className="text-muted mb-1">
                              Quantity :
                              <strong>
                                {" "}
                                {item.quantity}
                              </strong>
                            </p>

                            <h5 className="text-success">
                              ₹ {item.price}
                            </h5>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center flex-wrap">

                <div>

                  <h4 className="fw-bold">

                    Total :

                    <span className="text-success">
                      {" "}
                      ₹ {order.totalAmount}
                    </span>

                  </h4>

                </div>

                <InvoiceButton order={order} />

              </div>

            </div>

          </div>

        ))

      )}

    </div>

    <Footer />
  </>
);

}
export default MyOrders;