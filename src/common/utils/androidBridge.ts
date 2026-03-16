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

export type AndroidMessage = {
  type: string;
  payload?: unknown;
};

export const isAndroidWebView = (): boolean => {
  return typeof window !== "undefined" && !!window.Android;
};

export const sendToAndroid = (message: AndroidMessage): void => {
  if (!isAndroidWebView()) {
    console.warn("Android bridge is not available");
    return;
  }

  try {
    window.Android?.postMessage(JSON.stringify(message));
  } catch (err) {
    console.error("Failed to send message to Android:", err);
  }
};

export const vibrateDevice = (): void => {
  if (!isAndroidWebView()) {
    console.warn("Android bridge is not available");
    return;
  }

  try {
    window.Android?.vibrate();
  } catch (err) {
    console.error("Failed to vibrate device:", err);
  }
};

export const registerMotionCallback = (callback: () => void): (() => void) => {
  if (typeof window === "undefined") return () => {};

  window.onAndroidMotion = callback;

  return () => {
    window.onAndroidMotion = undefined;
  };
};

export const notifyWakeup = (userId: string): void => {
  sendToAndroid({
    type: "wakeup",
    payload: { userId },
  });
};

export const notifySleep = (userId: string): void => {
  sendToAndroid({
    type: "sleep",
    payload: { userId },
  });
};

export const requestNotificationPermission = (): void => {
  sendToAndroid({
    type: "request_notification_permission",
  });
};
