import { useEffect } from "react";
import { toast } from "react-hot-toast";

const useHandleOldData = (fetchedAt: number) => {
  useEffect(() => {
    const diffInSeconds = (new Date().getTime() - fetchedAt) / 1000;
    const diffInMinutes = diffInSeconds / 60;
    if (diffInMinutes > (Number(process.env.NEXT_PUBLIC_REVALIDATE_MINUTES) || 15)) {
      toast.error(`The data is outdated.\nReloading the page...`);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.success("The data is up to date");
    }
  }, [fetchedAt]);
};

export default useHandleOldData;
