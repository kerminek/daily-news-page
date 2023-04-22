import { NextApiRequest, NextApiResponse } from "next";

import fetchWithDelay from "@/utils/fetchWithDelay";

const headers = new Headers();
headers.append("Authorization", `Bearer ${process.env.API_SECRET}`);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (!req.query.lastRegenerationDate) {
      res.status(400).json({ message: "You didn't provide any date!" });
      return;
    }
    try {
      const shouldRefresh = await fetchWithDelay(
        process.env.BASE_URL + `/api/cache?lastRegenerationDate=${req.query.lastRegenerationDate}`,
        Number(process.env.FETCH_INTERVAL_TIME || 250),
        Number(process.env.FETCH_INTERVAL_TRIES || 20),
        headers
      );

      if (!shouldRefresh) {
        res.status(200).json({ refresh: false });
      } else {
        console.log("If there's already a proper value we are sending true: " + shouldRefresh);
        res.status(200).json({ refresh: true });
      }
    } catch (error) {
      res.status(500).json({ refresh: false, error });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
