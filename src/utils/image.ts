import { timeout, TimeoutError } from "promise-timeout";

export const preload = (url: string) => {
  return new Promise<string>((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      resolve(url);
    };
    img.onerror = () => {
      resolve("");
    };
    img.onabort = () => {
      resolve("");
    };
  });
};

export const preloadManager = async (urls: string[]) => {
  const res = await Promise.all(
    urls.map(async (url) => {
      const promise = preload(url);

      try {
        await timeout(promise, 5000);
        return true;
      } catch (error) {
        if (error instanceof TimeoutError) {
          console.error(`failed to load ${url}`);
          return false;
        }
        return false;
      }
    })
  );
  return res.filter((flag) => flag);
};
