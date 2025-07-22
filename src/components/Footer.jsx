import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-8"> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-blue-300 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-300 transition">
                  About College
                </a>
              </li>
              <li>
                <a href="/academic" className="hover:text-blue-300 transition">
                  Academic
                </a>
              </li>
              <li>
                <a href="/faculty" className="hover:text-blue-300 transition">
                  Faculty
                </a>
              </li>
              <li>
                <a href="/admission" className="hover:text-blue-300 transition">
                  Admission
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p>Shri Pal Singh Saraswati Vidya Mandir Inter College</p>
              <p>Chaukhadiya Maigalganj Kheri</p>
              <p>Uttar Pradesh - 261505</p>

              <p className="mt-2">Phone: +91 9919869704,9838223767 </p>
              {/* <p>Email: spssvmic.mgl@gmail.com</p> */}
              <p>
                Email:{" "}
                <a
                  href="mailto:spssvmic.mgl@gmail.com"
                  className="text-white-600 hover:underline"
                >
                  spssvmic.mgl@gmail.com
                </a>
              </p>
            </address>
            {/* <div className="flex space-x-4">
              <a
                href="#"
                className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="bg-blue-400 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-500 transition"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="bg-red-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-700 transition"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="#"
                className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-700 transition"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div> */}

            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-500 transition"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-700 transition"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-700 transition"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">School Hours</h4>
              <p>Monday - Saturday: 8:00 AM - 2:00 PM</p>
            </div>
          </div>

          <div className="flex">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.7629962138326!2d80.3439544351266!3d27.726992815200433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399f1bb55c80f789%3A0xe910ab0cf1d43a05!2sSripal%20Singh%20Saraswati%20Vidya%20Mandir%2C%20Maigalganj%20Kheri!5e1!3m2!1sen!2sin!4v1748972130733!5m2!1sen!2sin"
              width="600px"
              height="300px"
              style={{ border: "0" }} // Fixed style warning
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" // Fixed referrerpolicy warning
            ></iframe>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          {/* <p>
            &copy; {new Date().getFullYear()} Made By Vaibhav. All Rights
            Reserved.
          </p> */}
          <p>
            &copy; {new Date().getFullYear()} Made By{" "}
            <a
              href="https://www.linkedin.com/in/114-vaibhav-gupta/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline transform transition-transform duration-300 hover:scale-110 inline-block"
            >
              <u>Vaibhav</u>
            </a>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
