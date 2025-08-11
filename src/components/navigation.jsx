import React from "react";

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          {/* <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}tes
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button> */}
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
              <a href="#live-camera" className="page-scroll">
                Live Camera
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio" className="page-scroll">
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
              <a href="/sign-in" className=" !bg-[#EB2525] !text-white !px-4  uppercase">
                Admin Page
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
