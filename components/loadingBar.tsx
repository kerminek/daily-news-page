import React from "react";

type Props = { timer: number };

const LoadingBar = (props: Props) => {
  const { timer } = props;
  return (
    <>
      <div
        className="h-2 bg-black absolute top-0 left-0 transition-[width] duration-[3.8s] ease-linear"
        style={{ width: timer === 5 ? "100%" : "0" }}
      ></div>
      <div
        className="h-2 bg-black absolute bottom-0 right-0 transition-[width] duration-[3.8s] ease-linear"
        style={{ width: timer === 5 ? "100%" : "0" }}
      ></div>
      <div
        className="w-2 bg-black absolute top-0 left-0 transition-[height] duration-[3.8s] ease-linear"
        style={{ height: timer === 5 ? "100%" : "0" }}
      ></div>
      <div
        className="w-2 bg-black absolute bottom-0 right-0 transition-[height] duration-[3.8s] ease-linear"
        style={{ height: timer === 5 ? "100%" : "0" }}
      ></div>
    </>
  );
};

export default LoadingBar;
