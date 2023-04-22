import { NextApiRequest, NextApiResponse } from "next";

import { createHash } from "crypto";
import NodeCache from "node-cache";

const cache = new NodeCache();
const key = createHash("md5").update("lastRegenerationDate").digest("hex");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const actualSecret = process.env.API_SECRET;
    // Retrieve the Authorization header value from the request
    const authHeader = req.headers.authorization;
    // Extract the token value from the Authorization header
    const token = authHeader ? authHeader.split(" ")[1] : null;
    // Compare the token value with the actual secret value
    if (token !== actualSecret) {
      res.status(401).send("Unauthorized");
      return;
    }
    // This route will be called by Next.js ISR after a page is regenerated
    // Update the lastRegenerationDate variable
    const lastRegenerationDate = Number(req.query.postRegenerationDate);

    cache.set(key, lastRegenerationDate);
    console.log("CACHE-POST--- ", lastRegenerationDate);
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
