import React, { useEffect, useState } from "react";

export default function Timer(props) {
  const time = props.children;
  return (
    <>
      <div
        className="timer bg-light tile"
        style={{
          width: "100px",
          height: "100px",
          margin: "50px auto 0px",
          borderRadius: "25px",
          boxShadow: "0px 0px 60px #d5d5d5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ margin: "0" }}>{time}</h2>
      </div>
    </>
  );
}
