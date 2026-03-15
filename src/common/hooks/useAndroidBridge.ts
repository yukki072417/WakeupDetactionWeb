declare global {
  interface AndroidBridge {
    postMessage(msg: string): void;
    vibrate(): void; // ← すでに追加済みならそのまま
  }

  interface Window {
    Android?: AndroidBridge;

    // ← これを追加
    onAndroidMotion?: () => void;
  }
}

export const useAndroidBridge = () => {
  const send = (msg: string) => {
    window.Android?.postMessage(msg);
  };

  const vibrate = () => {
    window.Android?.vibrate?.();
  };

  return { send, vibrate };
};
