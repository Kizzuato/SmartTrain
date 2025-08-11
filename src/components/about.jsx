import React from "react";
import LiveCamPreview from "./LiveCamPreview";

export const About = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <LiveCamPreview
              wsUrl="http://192.168.18.16:4747/video"
              autoPlay={true}
              controls={true}
            />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2 className="font-bold">Live Camera</h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
