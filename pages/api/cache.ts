import { NextApiRequest, NextApiResponse } from "next";

import { createHash } from "crypto";
import NodeCache from "node-cache";

const cache = new NodeCache();
const key = createHash("md5").update("lastRegenerationDate").digest("hex");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const actualSecret = process.env.API_SECRET;
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(" ")[1] : null;
  if (token !== actualSecret) {
    res.status(401).json({ message: "Unauthorized", refresh: false });
    return;
  }
  if (req.method === "POST") {
    const lastRegenerationDate = Number(req.query.postRegenerationDate);
    console.log("CACHE-POST--- ", lastRegenerationDate);

    cache.set(key, lastRegenerationDate);
    res.status(200).end();
  } else if (req.method === "GET") {
    const userDate = Number(req.query.lastRegenerationDate);
    console.log("CACHE-GET--- ", userDate, cache.get(key));

    const currentDate = (cache.get(key) as number) || userDate;
    const shouldRefresh = userDate < currentDate;

    res.status(200).json({ refresh: shouldRefresh });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
