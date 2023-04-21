import { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "crypto";
import cache from "@/cache";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (!req.query.lastRegenerationDate) {
      res.status(400).json({ message: "You didn't provide any date!" });
      return;
    }

    const userDate = Number(req.query.lastRegenerationDate);
    const key = createHash("md5").update("lastRegenerationDate").digest("hex");

    const currentDate = (cache.get(key) as number) || userDate;
    const shouldRefresh = userDate < currentDate;

    if (!shouldRefresh) {
      const timeout = setTimeout(() => {
        // cache.off("change", listener);
        console.log("Logging the timeout.");
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
      cache.once("set", listener);
    } else {
      console.log("If there's already a proper value we are sending true: " + shouldRefresh);
      res.status(200).json({ refresh: shouldRefresh });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
