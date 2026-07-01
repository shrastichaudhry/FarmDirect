import { useEffect, useState } from "react";
import { getAllOrders } from "../api/orderApi";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function FarmerAnalytics() {

  const [revenue, setRevenue] = useState(0);

  const [orders, setOrders] = useState(0);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {

    try {

      const res = await getAllOrders();

      const allOrders = res.data;

      setOrders(allOrders.length);

      let totalRevenue = 0;

      allOrders.forEach(order => {
        totalRevenue += order.totalAmount;
      });

      setRevenue(totalRevenue);

    } catch (err) {

      console.log(err);

    }

  };

  const data = {

    labels: ["Revenue"],

    datasets: [

      {
        label: "Total Revenue",

        data: [revenue],

        backgroundColor: "rgba(25,135,84,0.8)",

      },

    ],

  };

  return (

    <div className="container mt-5">

      <div className="row mb-4">

        <div className="col-md-6">

          <div className="card shadow text-center">

            <div className="card-body">

              <h4>Total Orders</h4>

              <h2 className="text-success">
                {orders}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow text-center">

            <div className="card-body">

              <h4>Total Revenue</h4>

              <h2 className="text-primary">
                ₹ {revenue}
              </h2>

            </div>

          </div>

        </div>

      </div>

      <div className="card shadow">

        <div className="card-body">

          <h3 className="mb-4">
            Revenue Analytics
          </h3>

          <Bar data={data} />

        </div>

      </div>

    </div>

  );

}

export default FarmerAnalytics;