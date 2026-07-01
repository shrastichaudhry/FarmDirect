import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaArrowUp,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (

    <footer className="bg-dark text-white pt-5">

      <div className="container">

        <div className="row">

          {/* Company */}

          <div className="col-md-4 mb-4">

            <h3 className="fw-bold text-warning">

              🌾 FarmDirect

            </h3>

            <p className="mt-3">

              FarmDirect connects farmers directly with consumers,
              providing fresh, healthy and affordable agricultural
              products without middlemen.

            </p>

          </div>

          {/* Quick Links */}

          <div className="col-md-2 mb-4">

            <h5 className="text-warning">
              Quick Links
            </h5>

            <ul className="list-unstyled">

              <li>
                <Link className="text-white text-decoration-none" to="/">
                  Home
                </Link>
              </li>

              <li>
                <Link className="text-white text-decoration-none" to="/products">
                  Products
                </Link>
              </li>

              <li>
                <Link className="text-white text-decoration-none" to="/cart">
                  Cart
                </Link>
              </li>

              <li>
                <Link className="text-white text-decoration-none" to="/wishlist">
                  Wishlist
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div className="col-md-3 mb-4">

            <h5 className="text-warning">
              Contact
            </h5>

            <p>📍 India</p>

            <p>📧 support@farmdirect.com</p>

            <p>📞 +91 9876543210</p>

          </div>

          {/* Social */}

          <div className="col-md-3 mb-4">

            <h5 className="text-warning">

              Follow Us

            </h5>

            <div className="d-flex gap-3 fs-3 mt-3">

              <FaFacebook />

              <FaInstagram />

              <FaTwitter />

              <FaLinkedin />

            </div>

            <button
              className="btn btn-success mt-4"
              onClick={scrollTop}
            >
              <FaArrowUp /> Back To Top
            </button>

          </div>

        </div>

        <hr />

        <div className="text-center pb-3">

          © 2026 FarmDirect Marketplace | Made with ❤️ using React & Node.js

        </div>

      </div>

    </footer>

  );

}

export default Footer;