export default async function fetchWithDelay(
  url: string,
  delay: number,
  retries: number,
  headers?: Headers
): Promise<any> {
  const promiseToReturn = new Promise(async (resolve, reject) => {
    let shouldRefresh = false;
    let retryCount = 0;

    do {
      try {
        const response = await fetch(url, { headers }).then((res) => res.json());
        shouldRefresh = response.refresh;
        if (shouldRefresh) resolve(true);
        else if (!shouldRefresh) await new Promise((resolve) => setTimeout(resolve, delay));
      } catch (error) {
        console.error(`Error fetching data from ${url}: ${error}`);
        reject(false);
      }

      retryCount++;
    } while (!shouldRefresh && retryCount < retries);

    if (!shouldRefresh) reject(false);
  });

  return promiseToReturn;
}
