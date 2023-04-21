import { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "crypto";
import NodeCache from "node-cache";

const cache = new NodeCache();
const key = createHash("md5").update("lastRegenerationDate").digest("hex");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (!req.query.lastRegenerationDate) {
      res.status(400).json({ message: "You didn't provide any date!" });
      return;
    }

    const userDate = Number(req.query.lastRegenerationDate);

    const currentDate = (cache.get(key) as number) || userDate;
    const shouldRefresh = userDate < currentDate;

    if (!shouldRefresh) {
      const timeout = setTimeout(() => {
        cache.off("set", listener);
        console.log("Logging the timeout with cache.get(key): " + cache.get(key));
        res.status(200).json({ refresh: shouldRefresh });
      }, 8000);

      const listener = (_key: string, value: number) => {
        console.log("listener worked!!!");
        if (_key === key && userDate < value) {
          clearTimeout(timeout);
          res.status(200).json({ refresh: true });
        }
      };

      console.log("Starting to listening the cache...");
      cache.on("set", listener);
    } else {
      console.log("If there's already a proper value we are sending true: " + shouldRefresh);
      res.status(200).json({ refresh: shouldRefresh });
    }
  } else if (req.method === "POST") {
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
    console.log("Regenerated API: ", lastRegenerationDate);
    console.log("List of the keys at the moment: " + cache.keys());
    res.status(200).end();
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
