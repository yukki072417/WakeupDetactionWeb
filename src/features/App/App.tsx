import { useEffect } from "react";
import { useAndroidBridge } from "../../common/hooks/useAndroidBridge";

function App() {
  const { send } = useAndroidBridge();

  useEffect(() => {
    // Vite dev server からデータを取得
    fetch("http://10.0.2.2:3000/api/data")
      .then((res) => res.json())
      .then((data) => {
        send(JSON.stringify(data)); // Android に送信
      });
  }, []);

  return (
    <div>
      <button onClick={() => send("Hello from React")}>Send to Android</button>
    </div>
  );
}

export default App;
