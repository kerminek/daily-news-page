import { NextApiRequest, NextApiResponse } from "next";

import { createHash } from "crypto";

import cache from "@/cache";
const key = createHash("md5").update("lastRegenerationDate").digest("hex");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const cacheData = cache.get(key);

    res.status(200).json({ message: cacheData });
  }
}
