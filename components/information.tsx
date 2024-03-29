import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import LoadingBar from "@/components/loadingBar";

type Props = {
  popupState: boolean;
  popupStateSet: Dispatch<SetStateAction<boolean>>;
};

const InformationComponent = (props: Props) => {
  const { popupState, popupStateSet } = props;
  const [timer, timerSet] = useState(5);

  useEffect(() => {
    if (timer === 0) {
      popupStateSet(false);
      return;
    }
    const intervalId = setInterval(() => {
      timerSet((curr) => curr - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer, popupStateSet]);

  return (
    <div
      className={`w-full h-screen z-50 fixed bg-white/90 flex justify-center items-center font-sans transition-all duration-700 cursor-pointer ${
        !popupState && "opacity-0 invisible"
      }`}
      onClick={() => popupStateSet(false)}
    >
      <LoadingBar timer={timer} />
      <div className="backdrop-blur-md h-full w-full absolute -z-10"></div>
      <div className="flex flex-col gap-10">
        <div className="text-center font-bold px-10 space-y-5">
          <p className="">
            This page used to be fully dynamic, but due to the many problems with data providers, only NASA&apos;s
            &quot;Picture of the day&quot; gets rehydrated.
          </p>
          <p>Sorry.</p>
          <p className="font-normal text-xs italic">Click anywhere to close</p>
        </div>
      </div>
    </div>
  );
};

export default InformationComponent;
