import { useEffect } from "react";
import { toast } from "react-hot-toast";

const useHandleOldData = (fetchedAt: number) => {
  useEffect(() => {
    const dataFetchDifference = (new Date().getTime() - fetchedAt) / 1000;
    if (dataFetchDifference > 10) {
      toast.error(`The data is outdated.\nReloading the page...`);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.success("The data is up to date");
    }
  }, [fetchedAt]);
};

export default useHandleOldData;
