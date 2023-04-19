import type { NextApiRequest, NextApiResponse } from "next";

import { createHash } from "crypto";

import cache from "@/cache";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (!req.query.lastRegenerationDate) {
      res.status(200).json({ refresh: false, message: "You didn't provide any date!" });
      return;
    }
    const userDate = Number(req.query.lastRegenerationDate);
    const key = createHash("md5").update("lastRegenerationDate").digest("hex");

    if (!cache.get(key)) cache.set(key, userDate);

    // This route will be called by the client to check if the page has been regenerated
    const maxWaitTime = 5000; // 5 seconds
    let waitedTime = 0;
    const intervalTime = 100; // Check every 100ms
    const waitInterval = setInterval(() => {
      if (waitedTime >= maxWaitTime) {
        clearInterval(waitInterval);
        res.status(200).json({ refresh: false });
      } else if (cache.get(key) !== userDate) {
        clearInterval(waitInterval);
        res.status(200).json({ refresh: true, lastRegenerationDate: cache.get(key) });
      }
      waitedTime += intervalTime;
    }, intervalTime);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
