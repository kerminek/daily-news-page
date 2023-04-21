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

    const currentDate = (cache.get(key) as number) || userDate;
    const shouldRefresh = userDate < currentDate;

    // res.status(200).json({ currentDate, userDate });
    console.log(shouldRefresh);
    res.status(200).json({ refresh: shouldRefresh });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
