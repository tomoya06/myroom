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
