import { NextApiRequest, NextApiResponse } from "next";

import fetchWithDelay from "@/utils/fetchWithDelay";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (!req.query.lastRegenerationDate) {
      res.status(400).json({ message: "You didn't provide any date!" });
      return;
    }
    const shouldRefresh = await fetchWithDelay(
      process.env.BASE_URL + `/api/cache?lastRegenerationDate=${req.query.lastRegenerationDate}`,
      250,
      10
    );

    // const userDate = Number(req.query.lastRegenerationDate);

    // const currentDate = (cache.get(key) as number) || userDate;
    // const shouldRefresh = userDate < currentDate;

    if (!shouldRefresh) {
      res.status(200).json({ refresh: false });

      // const timeout = setTimeout(() => {
      //   cache.off("set", listener);
      //   console.log("Logging the timeout with cache.get(key): " + cache.get(key));
      //   res.status(200).json({ refresh: shouldRefresh });
      // }, 8000);
      // const listener = (_key: string, value: number) => {
      //   console.log("listener worked!!!");
      //   if (_key === key && userDate < value) {
      //     clearTimeout(timeout);
      //     res.status(200).json({ refresh: true });
      //   }
      // };
      // console.log("Starting to listening the cache...");
      // cache.on("set", listener);
      // let timePassed = 0;
      // const intervalTime = Number(process.env.INTERVAL_TIME) || 100;
      // const intervalTimeout = Number(process.env.INTERVAL_TIMEOUT) || 5000;
      // const interval = setInterval(() => {
      //   const cacheVal = (cache.get(key) as number) || userDate;
      //   if (userDate < cacheVal) {
      //     clearInterval(interval);
      //     res.status(200).json({ refresh: true });
      //     return;
      //   }
      //   if (intervalTimeout === timePassed) {
      //     clearInterval(interval);
      //     res.status(200).json({ refresh: false });
      //     return;
      //   }
      //   timePassed += intervalTime;
      // }, intervalTime);
    } else {
      console.log("If there's already a proper value we are sending true: " + shouldRefresh);
      res.status(200).json({ refresh: true });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
