import React from "react";
import "../../App.css";

import OutsideBusTown1 from "../../assets/home/busbackground/OutsideBusTown1.webm";
import OutsideBusTown2 from "../../assets/home/busbackground/OutsideBusTown2.webm";
import OutsideBusTown3 from "../../assets/home/busbackground/OutsideBusTown3.webm";

export default function TabletLayout({ children, currentScenario }) {
  let videoSource = OutsideBusTown1;

  if (currentScenario.includes("Town2")) {
    videoSource = OutsideBusTown2;
  } else if (currentScenario.includes("Town3")) {
    videoSource = OutsideBusTown3;
  }

  return (
    <div className="tablet-layout-container">
      <div className="video-aspect-ratio-box">
        <video
          key={videoSource}
          className="bg-video"
          src={videoSource}
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="tablet-screen-anchor">
          <div className="tablet-content-scaler">{children}</div>
        </div>
      </div>
    </div>
  );
}
