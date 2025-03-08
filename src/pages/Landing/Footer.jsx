import { MdMail } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-24 text-gray-600 bg-white border-t border-gray-200">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:!grid-cols-2 lg:!grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center space-x-2">
              <MdMail className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-gray-900">
                Bravt Cloud
              </span>
            </div>
            <p className="text-sm">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="flex" method="post" target="_blank" noValidate>
              <input
                type="email"
                name="EMAIL"
                placeholder="Enter your email"
                className="flex-1 h-10 px-3 py-2 border-2 !border-r-0 border-gray-300 rounded-md rounded-r-none focus:outline-none focus:border-primary"
              />

              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_UNIQUE_ID_LIST_ID"
                  tabIndex="-1"
                  value=""
                />
              </div>

              <button
                type="submit"
                className="h-10 px-4 py-2 text-white transition duration-300 bg-primary rounded-r-md hover:bg-blue-600"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Legal</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm transition duration-300 hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/acceptable-use"
                  className="text-sm transition duration-300 hover:text-primary"
                >
                  Acceptable Use Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm transition duration-300 hover:text-primary"
                >
                  Terms of service
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">VPS Hosting</h3>
            <ul className="space-y-2 [&>_li]:text-sm">
              <li>Buy VPS</li>
              <li>Hourly VPS</li>
              <li>PayPal VPS</li>
              <li>CyberPanel VPS</li>
              <li>BlueStacks VPS</li>
              <li>Wordpress VPS</li>
              <li>NVMe SSD VPS</li>
              <li>Linux VPS</li>
              <li>MikroTik VPS</li>
              <li>Windows VPS</li>
              <li>RDP VPS</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition duration-300 hover:text-primary"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition duration-300 hover:text-primary"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition duration-300 hover:text-primary"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition duration-300 hover:text-primary"
              >
                <FaYoutube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-600">
            © {new Date().getFullYear()} Bravt Cloud. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
