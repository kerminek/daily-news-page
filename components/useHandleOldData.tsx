import fetchWithDelay from "@/utils/fetchWithDelay";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const useHandleOldData = (fetchedAt: number) => {
  useEffect(() => {
    const diffInSeconds = (new Date().getTime() - fetchedAt) / 1000;
    const diffInMinutes = diffInSeconds / 60;

    if (diffInMinutes > (Number(process.env.NEXT_PUBLIC_REVALIDATE_MINUTES) || 15)) {
      const refresh = fetchWithDelay(window.location.href + `/api/refresh?lastRegenerationDate=${fetchedAt}`, 500, 10);

      toast.promise(refresh, {
        loading: "Getting new informations...",
        error: "Failed to fetch new data.",
        success: "Reloading...",
      });

      refresh.then(() => window.location.reload());
    }
  }, [fetchedAt]);
};

export default useHandleOldData;
