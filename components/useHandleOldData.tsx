import { useEffect } from "react";
import { toast } from "react-hot-toast";

const useHandleOldData = (fetchedAt: number) => {
  useEffect(() => {
    const diffInSeconds = (new Date().getTime() - fetchedAt) / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const abortController = new AbortController();

    if (diffInMinutes > (Number(process.env.NEXT_PUBLIC_REVALIDATE_MINUTES) || 15)) {
      const refresh = new Promise(async (resolve, reject) => {
        await fetch(window.location.href + `/api/refresh?lastRegenerationDate=${fetchedAt}`, {
          signal: abortController.signal,
        })
          .then(async (res) => {
            const resData = await res.json();
            if (resData.refresh) {
              resolve(resData);
            } else {
              reject(resData);
            }
          })
          .catch((err) => reject(err));
      });

      toast.promise(refresh, {
        loading: "Getting new informations...",
        error: "Failed to fetch new data.",
        success: "Reloading...",
      });

      console.log(async () => await refresh);
      // refresh.then(() => window.location.reload());
    }

    return () => abortController.abort();
  }, []);
};

export default useHandleOldData;
