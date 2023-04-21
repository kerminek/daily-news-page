import type { NextApiRequest, NextApiResponse } from "next";

import { createHash } from "crypto";

import cache from "@/cache";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("incoming call to /api/regenerated ...");

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

    const key = createHash("md5").update("lastRegenerationDate").digest("hex");
    cache.set(key, lastRegenerationDate);
    console.log("Regenerated API: ", lastRegenerationDate);
    console.log("List of the keys at the moment: " + cache.keys());
    res.status(200).end();
  }
}
