import React from "react";
import { Link } from "react-router-dom";

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <a
            className="text-3xl font-bold navbar-brand page-scroll flex"
            href="#page-top"
          >
            SMART-
            <div className=" text-[#EB2525]">TRAIN</div>
          </a>
        </div>

        <div className="" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right flex items-center text-center">
            <li>
              <a href="#features" className="page-scroll">
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                Live Camera
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Gallery
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
            <li>
              {/* tambahin link nya */}
              <Link to="/login" className=" !bg-[#EB2525] !text-white !px-4  uppercase">
                Admin Page
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
