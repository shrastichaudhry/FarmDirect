import { Link, useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg,#198754,#43b97f)",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-6">

              <span className="badge bg-warning text-dark px-3 py-2 mb-3 fs-6">
                🌱 100% Fresh • Organic • Direct From Farmers
              </span>

              <h1
                className="fw-bold text-white"
                style={{
                  fontSize: "3.8rem",
                  lineHeight: "1.2",
                }}
              >
                Fresh Food
                <br />
                Straight From
                <br />
                <span className="text-warning">
                  Local Farmers
                </span>
              </h1>

              <p
                className="text-white mt-4"
                style={{
                  fontSize: "20px",
                  opacity: "0.95",
                }}
              >
                Buy vegetables, fruits, grains and dairy products
                directly from trusted farmers at affordable prices.
                Freshness guaranteed.
              </p>

              <div className="mt-4">

                <Link
                  to="/products"
                  className="btn btn-warning btn-lg rounded-pill px-5 me-3 fw-bold"
                >
                  Shop Now →
                </Link>

                <Link
                  to="/products"
                  className="btn btn-outline-light btn-lg rounded-pill px-5"
                >
                  Explore
                </Link>

              </div>

            </div>

            <div className="col-lg-6 text-center">

              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900"
                alt="Farm"
                className="img-fluid shadow-lg"
                style={{
                  borderRadius: "25px",
                  maxHeight: "550px",
                }}
              />

            </div>

          </div>

        </div>
      </section>

      {/* Statistics */}

      <section className="py-5 bg-light">

        <div className="container">

          <div className="row text-center">

            <div className="col-md-3 mb-4">

              <div className="card border-0 shadow h-100 rounded-4">

                <div className="card-body py-4">

                  <h1>👨‍🌾</h1>

                  <h2 className="fw-bold text-success">
                    150+
                  </h2>

                  <p className="mb-0">
                    Registered Farmers
                  </p>

                </div>

              </div>

            </div>

            <div className="col-md-3 mb-4">

              <div className="card border-0 shadow h-100 rounded-4">

                <div className="card-body py-4">

                  <h1>🥬</h1>

                  <h2 className="fw-bold text-success">
                    500+
                  </h2>

                  <p className="mb-0">
                    Fresh Products
                  </p>

                </div>

              </div>

            </div>

            <div className="col-md-3 mb-4">

              <div className="card border-0 shadow h-100 rounded-4">

                <div className="card-body py-4">

                  <h1>📦</h1>

                  <h2 className="fw-bold text-success">
                    1200+
                  </h2>

                  <p className="mb-0">
                    Orders Delivered
                  </p>

                </div>

              </div>

            </div>

            <div className="col-md-3 mb-4">

              <div className="card border-0 shadow h-100 rounded-4">

                <div className="card-body py-4">

                  <h1>😊</h1>

                  <h2 className="fw-bold text-success">
                    98%
                  </h2>

                  <p className="mb-0">
                    Happy Customers
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Categories */}

      <section className="py-5">

        <div className="container">

          <h2 className="fw-bold text-center mb-5">
            Shop By Category
          </h2>

          <div className="row g-4">

            {[
              
               { icon: "🥦", name: "Vegetables" },
               { icon: "🍎", name: "Fruits" },
               { icon: "🥛", name: "Dairy" },
               { icon: "🌾", name: "Grains" },
               { icon: "🌿", name: "Herbs" },
               { icon: "🥜", name: "Dry Fruits" },
              
            ].map((item) => (

              <div
                className="col-lg-4 col-md-6"
                key={item.name}
              >

                <div
                  className="card border-0 shadow-lg rounded-4 text-center h-100"
                  style={{
                    transition: "0.3s",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(`/products?category=${item.name}`)
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-8px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0px)";
                  }}
                >

                  <div className="card-body py-5">

                    <h1
                      style={{
                        fontSize: "55px",
                      }}
                    >
                      {item.icon}
                    </h1>

                    <h4 className="fw-bold mt-3">
                      {item.name}
                    </h4>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Why Choose Us */}

      <section className="py-5 bg-success text-white">

        <div className="container">

          <h2 className="text-center fw-bold mb-5">
            Why Choose FarmDirect?
          </h2>

          <div className="row">

            <div className="col-md-4 text-center">

              <div className="p-4">

                <h1 style={{ fontSize: "60px" }}>
                  🚜
                </h1>

                <h3 className="mt-3">
                  Direct From Farmers
                </h3>

                <p>
                  Buy directly from local farmers without any
                  middlemen.
                </p>

              </div>

            </div>

            <div className="col-md-4 text-center">

              <div className="p-4">

                <h1 style={{ fontSize: "60px" }}>
                  🥬
                </h1>

                <h3 className="mt-3">
                  Farm Fresh
                </h3>

                <p>
                  Freshly harvested products delivered to your
                  doorstep.
                </p>

              </div>

            </div>

            <div className="col-md-4 text-center">

              <div className="p-4">

                <h1 style={{ fontSize: "60px" }}>
                  🚚
                </h1>

                <h3 className="mt-3">
                  Fast Delivery
                </h3>

                <p>
                  Safe and quick delivery across your city.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Home;