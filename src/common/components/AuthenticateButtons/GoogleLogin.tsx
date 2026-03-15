import { useAndroidBridge } from "../../hooks/useAndroidBridge";

const GoogleLogin = () => {
  const bridge = useAndroidBridge();
  const test = () => {
    bridge.vibrate();
  };

  return (
    <>
      <button onClick={test} title="未実装です">
        Googleでログイン(準備中)
      </button>
    </>
  );
};

export default GoogleLogin;
