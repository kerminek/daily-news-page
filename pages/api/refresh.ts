import type { NextApiRequest, NextApiResponse } from "next";

let lastRegenerationDate: number;

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
    lastRegenerationDate = Number(req.query.postRegenerationDate);
    console.log("Page regenerated at", lastRegenerationDate);
    res.status(200).end();
  } else if (req.method === "GET") {
    const userDate = Number(req.query.lastRegenerationDate);

    // This route will be called by the client to check if the page has been regenerated
    const maxWaitTime = 5000; // 5 seconds
    let waitedTime = 0;
    const intervalTime = 100; // Check every 100ms
    const waitInterval = setInterval(() => {
      if (waitedTime >= maxWaitTime) {
        clearInterval(waitInterval);
        res.status(200).json({ refresh: false });
      } else if (lastRegenerationDate !== userDate) {
        clearInterval(waitInterval);
        res.status(200).json({ refresh: true, lastRegenerationDate });
      }
      waitedTime += intervalTime;
    }, intervalTime);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
