declare global {
  interface AndroidBridge {
    postMessage(msg: string): void;
  }

  interface Window {
    Android?: AndroidBridge;
  }
}

export const useAndroidBridge = () => {
  const send = (msg: string) => {
    window.Android?.postMessage(msg);
  };

  return { send };
};
