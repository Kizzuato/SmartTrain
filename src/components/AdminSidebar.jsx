"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
// import Fontaw 

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    // { name: "Users", href: "#" },
    // { name: "Settings", href: "#" },
  ];

  return (
    <>
      {/* Toggle Button - Mobile */}
      <button
        className="md:hidden p-2 text-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg p-4 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-200 w-72 z-50 px-4 pt-10 `}
      >
        <div className="h-12 m-2 mb-10">
          <i className="fas fa-chart-line"></i>
          <img
            src="img/admin-logo.svg" // ganti dengan path gambar kamu
            alt="Login Illustration"
            className="w-full"
          />
        </div>
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `font-semibold flex items-center gap-3 p-3 rounded-md transition ${
                  isActive
                    ? "bg-[#EB2525] bg-opacity-10 text-[#EB2525]"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
