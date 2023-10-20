import React from "react";
import "./Footer.css"

const Footer = () => {
    return (
        <div className="sec footer-container">
            <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 pt-5 mt-5 pb-3 justify-content-around">
                <div className="col mb-3">
                    <a
                        href="/"
                        className="footer-logo d-flex align-items-center mb-5 link-body-emphasis text-decoration-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                            <path fill="#FFF" d="M6,16c-3.1,3.7-6,7.6-6,11.1c0,2,1.7,4.9,5.9,4.9c2.3,0,4.5-0.9,6.3-1.6c3-1.2,35.7-15.1,35.7-15.1c0.3-0.2,0.3-0.4-0.1-0.3c-0.2,0-35.6,9.4-35.6,9.4c-0.7,0.2-1.4,0.3-2.1,0.3c-3.1,0-5.1-1.5-5.1-4.7C4.9,18.7,5.1,17.8,6,16L6,16z"></path>
                        </svg>
                    </a>
                    <p className="">© 2023 Safar, Inc. All rights reserved.</p>
                </div>

                <div className="col mb-3 footer-details">
                    <h5>Section</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 ">
                                Home
                            </a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 ">
                                Features
                            </a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 ">
                                Pricing
                            </a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 ">
                                FAQs
                            </a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/about" className="nav-link p-0 ">
                                About
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default Footer;

