import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isProd = process.env.NODE_ENV === "production";

  // should specify development path to trace. For now, i don't know which file we should track while on dev mode.
  const mainPageDir = path.join(process.cwd(), ".next", "server", "pages", isProd ? "index.html" : "index.js");

  if (!fs.existsSync(mainPageDir)) {
    const pagesPath = path.join(process.cwd(), "..");
    const folder = fs.readdirSync(pagesPath);
    res.status(404).json({ status: "file does not exist!", refresh: false, folder });
    return;
  }
  const ageInSeconds = (new Date().getTime() - fs.statSync(mainPageDir).mtimeMs) / 1000;
  //   console.log(`It's just ${ageInSeconds} seconds old.`);

  if (ageInSeconds < Number(process.env.NEXT_PUBLIC_REVALIDATE_MINUTES || 15) * 60) {
    if (ageInSeconds < 10) {
      res.status(200).json({ status: "It still can be new for you. You may have a slow connection.", refresh: true });
      return;
    }

    res.status(404).json({ status: `It's just ${ageInSeconds} seconds old.`, refresh: false });
    return;
  }

  const mainPage = fs.watch(mainPageDir);
  try {
    const promise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject("Failed after timeout!");
      }, 5000);

      if (fs.existsSync(mainPageDir)) {
        mainPage.addListener("change", () => {
          mainPage.removeAllListeners("change");

          clearTimeout(timeout);
          resolve("successfuly resolved!");
        });
      }
    });

    res.status(200).json({ status: await promise, refresh: true });
  } catch (error) {
    mainPage.removeAllListeners("change");

    res.status(500).json({ status: error, refresh: false });
  }
}
