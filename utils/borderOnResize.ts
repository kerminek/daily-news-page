import { useEffect, useState } from "react";

const borderOnResize = (firstItemId: string, secondItemId: string) => {
  const [isSameSize, isSameSizeSet] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const nytItem = document.getElementById(firstItemId);
      const nasaItem = document.getElementById(secondItemId);
      if (!nytItem || !nasaItem) return;

      const check = Boolean(Math.abs(nytItem?.clientWidth - nasaItem?.clientWidth) < 2);

      if (!check && check !== isSameSize) {
        isSameSizeSet(check);
      } else if (check && check !== isSameSize) {
        isSameSizeSet(check);
      }
    };

    // initial check
    handleResize();

    // check on resize
    window.addEventListener("resize", handleResize, { passive: true });

    return () => window.removeEventListener("resize", handleResize);
  }, [isSameSize]);

  return isSameSize;
};

export default borderOnResize;
