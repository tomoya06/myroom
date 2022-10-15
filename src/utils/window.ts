import { useMediaQuery } from "react-responsive";

export const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

export const MessageName = {
  PowerON: "win9_Start",
  PowerOFF: "win9_Exit",
};

export const isDev =
  location.host.startsWith("localhost") ||
  location.host.startsWith("127.0.0.1") ||
  location.host.startsWith("192.168.");

export const isPortrait = () => {
  return window.innerWidth < 480;
};

export const useMobile = () => {
  return useMediaQuery({ query: "(max-width: 480px)" });
};
