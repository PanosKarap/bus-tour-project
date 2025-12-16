import React from "react";
import "../../App.css";

import OutsideBusTown1 from "../../assets/busbackground/OutsideBusTown1.mp4";
import OutsideBusTown2 from "../../assets/busbackground/OutsideBusTown2.mp4";
import OutsideBusTown3 from "../../assets/busbackground/OutsideBusTown3.mp4";

export default function TabletLayout({ children, currentScenario }) {
  let videoSource = OutsideBusTown1;

  if (currentScenario === "insideClosedTown2") {
    videoSource = OutsideBusTown2;
  } else if (
    currentScenario === "insideClosedTown3" ||
    currentScenario === "insideOpenTown3"
  ) {
    videoSource = OutsideBusTown3;
  }

  return (
    <div className="tablet-layout-container">
      {/* NEW WRAPPER: This box maintains 16:9 ratio always */}
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
