// import { useState } from 'react'
import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left section: login form */}
      <div className="flex flex-col justify-center w-full md:p-0 px-20 py-48 md:w-1/2 lg:px-20 bg-white">
        <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
        <p className="text-gray-600 mb-8">
          Enter your Credentials to access your account
        </p>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                forgot password
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Name"
            />
          </div>

          <div class="flex items-center">
            <label class="flex items-center">
              <input type="checkbox" class="form-checkbox text-blue-600 translate-y-[0.5px]" />

              <span class="ml-2 text-gray-700 leading-none mt-3">Remember for 30 days</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Login
          </button>

          <div className="relative flex items-center justify-center">
            <span className="absolute bg-white px-2 text-gray-400">or</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      {/* Right section: image */}
      <div className="md:w-1/2 bg-gray-200">
        <img
          src="img/intro-bg.png" // ganti dengan path gambar kamu
          alt="Login Illustration"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
