import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getOrders } from "../api/orderApi";

function ConsumerDashboard() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await getOrders();

      const myOrders = res.data.filter(
        (order) => order.user?._id === user.id
      );

      setOrders(myOrders);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        {/* Welcome */}

        <div className="card shadow mb-4">

          <div className="card-body">

            <h2>
              Welcome, {user.name} 👋
            </h2>

            <p className="text-muted">
              Track your orders and shopping activity.
            </p>

          </div>

        </div>

        {/* Statistics */}

        <div className="row mb-4">

          <div className="col-md-4 mb-3">

            <div className="card shadow text-center p-4">

              <h5>Total Orders 📦</h5>

              <h2 className="text-primary">
                {orders.length}
              </h2>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow text-center p-4">

              <h5>Total Spending 💰</h5>

              <h2 className="text-success">

                ₹
                {orders.reduce(
                  (sum, order) => sum + order.totalAmount,
                  0
                )}

              </h2>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow text-center p-4">

              <h5>Delivered Orders 🚚</h5>

              <h2 className="text-warning">

                {
                  orders.filter(
                    (order) =>
                      order.status === "Delivered"
                  ).length
                }

              </h2>

            </div>

          </div>

        </div>

        {/* Orders */}

        <div className="card shadow">

          <div className="card-header bg-success text-white">

            My Orders

          </div>

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-light">

                <tr>

                  <th>#</th>

                  <th>Products</th>

                  <th>Total</th>

                  <th>Status</th>

                  <th>Date</th>

                </tr>

              </thead>

              <tbody>

                {orders.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-5"
                    >

                      <h4>No Orders Yet</h4>

                    </td>

                  </tr>

                ) : (

                  orders.map((order, index) => (

                    <tr key={order._id}>

                      <td>{index + 1}</td>

                      <td>

                        {order.items.map((item) => (

                          <div
                            key={item._id}
                            className="mb-2"
                          >

                            <strong>
                              {item.product?.name}
                            </strong>

                            <br />

                            Qty : {item.quantity}

                          </div>

                        ))}

                      </td>

                      <td>

                        ₹ {order.totalAmount}

                      </td>

                      <td>

                        <span
                          className={
                            order.status === "Pending"
                              ? "badge bg-warning text-dark"

                              : order.status === "Confirmed"
                              ? "badge bg-info"

                              : order.status === "Shipped"
                              ? "badge bg-primary"

                              : order.status === "Delivered"
                              ? "badge bg-success"

                              : "badge bg-danger"
                          }
                        >

                          {order.status}

                        </span>

                      </td>

                      <td>

                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default ConsumerDashboard;