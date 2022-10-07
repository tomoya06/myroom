export const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

export const MessageName = {
  PowerON: "ComputerScreen_Start",
  PowerOFF: "ComputerScreen_Exit",
};

export const isDev =
  location.host.startsWith("localhost") ||
  location.host.startsWith("127.0.0.1") ||
  location.host.startsWith("192.168.");

export const isPortrait = () => {
  return window.innerHeight >= window.innerWidth;
};
