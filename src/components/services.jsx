import React from "react";

export const Services = (props) => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2 className="font-bold">Gallery</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>
        <div className="w-100% h-[798px] p-8 bg-gradient-to-r from-red-600 to-red-800 inline-flex flex-col justify-start items-start gap-8 overflow-hidden">
          <div className="self-stretch flex-1 inline-flex justify-start items-start gap-8 overflow-hidden">
            <div className="w-72 self-stretch relative bg-white rounded-[40px]" />
            <div className="w-96 self-stretch relative bg-white rounded-[40px]" />
            <div className="w-52 self-stretch relative bg-white rounded-[40px]" />
            <div className="flex-1 self-stretch relative bg-white rounded-[40px]" />
          </div>
          <div className="self-stretch h-72 inline-flex justify-start items-start gap-8 overflow-hidden">
            <div className="w-80 self-stretch relative bg-white rounded-[40px]" />
            <div className="w-[590px] self-stretch relative bg-white rounded-[40px]" />
            <div className="w-96 self-stretch relative bg-white rounded-[40px]" />
          </div>
          <div className="self-stretch flex-1 inline-flex justify-start items-start gap-8 overflow-hidden">
            <div className="w-96 self-stretch relative bg-white rounded-[40px]" />
            <div className="flex-1 self-stretch relative bg-white rounded-[40px]" />
            <div className="w-80 self-stretch relative bg-white rounded-[40px]" />
            <div className="flex-1 self-stretch relative bg-white rounded-[40px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
