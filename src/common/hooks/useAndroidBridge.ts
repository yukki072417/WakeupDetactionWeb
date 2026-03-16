import {
  isAndroidWebView,
  sendToAndroid,
  vibrateDevice,
  registerMotionCallback,
} from "../utils/androidBridge";

declare global {
  interface AndroidBridge {
    postMessage(msg: string): void;
    vibrate(): void;
  }

  interface Window {
    Android?: AndroidBridge;
    onAndroidMotion?: () => void;
  }
}

export const useAndroidBridge = () => {
  const isAvailable = isAndroidWebView();

  const send = (msg: string) => {
    sendToAndroid({ type: "message", payload: msg });
  };

  const vibrate = () => {
    vibrateDevice();
  };

  const onMotion = (callback: () => void) => {
    return registerMotionCallback(callback);
  };

  return { isAvailable, send, vibrate, onMotion };
};
