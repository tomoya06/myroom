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
  const res = await Promise.all(urls.map((url) => preload(url)));
  return res.filter((flag) => flag);
};
