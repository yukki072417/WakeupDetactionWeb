import { useEffect, useState } from "react";
import "./Declaration.css";
import IconSleepy from "../../../assets/icon_sleepy_white.png";
import IconWakeup from "../../../assets/icon_wakeup_white.png";
import { useAuth } from "../../../common/contexts/authContext";
import {
  getWakeupTime,
  putWakeupTime,
  getSleepTime,
  putSleepTime,
} from "../../../common/api/wakeup";
import { notifySleep } from "../../../common/utils/androidBridge";

const Declaration = () => {
  const { session } = useAuth();
  const [wakeupTime, setWakeupTime] = useState("");
  const [sleepTime, setSleepTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.accessToken || !session?.userId) return;

    (async () => {
      try {
        const [wakeupResponse, sleepResponse] = await Promise.all([
          getWakeupTime({
            accessToken: session.accessToken,
            userId: session.userId,
          }),
          getSleepTime({
            accessToken: session.accessToken,
            userId: session.userId,
          }),
        ]);

        if (wakeupResponse.success && wakeupResponse.wakeup_time?.time) {
          setWakeupTime(wakeupResponse.wakeup_time.time.substring(0, 5));
        }

        if (sleepResponse.success && sleepResponse.sleep_time?.time) {
          setSleepTime(sleepResponse.sleep_time.time.substring(0, 5));
        }
      } catch (err) {
        console.error("時刻取得エラー:", err);
      }
    })();
  }, [session?.accessToken, session?.userId]);

  const handleWakeupTimeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setWakeupTime(newTime);

    if (!session?.accessToken || !session?.userId || !newTime) return;

    setLoading(true);
    try {
      await putWakeupTime({
        accessToken: session.accessToken,
        userId: session.userId,
        time: `${newTime}:00`,
      });
    } catch (err) {
      console.error("起床時刻登録エラー:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSleepTimeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setSleepTime(newTime);

    if (!session?.accessToken || !session?.userId || !newTime) return;

    setLoading(true);
    try {
      await putSleepTime({
        accessToken: session.accessToken,
        userId: session.userId,
        time: `${newTime}:00`,
      });

      notifySleep(session.userId);
    } catch (err) {
      console.error("就寝時刻登録エラー:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="Declaration sleepy">
        <img src={IconSleepy} alt="" />
        <input
          type="time"
          value={sleepTime}
          onChange={handleSleepTimeChange}
        />
        <p>に寝ます</p>
      </div>
      <div className="Declaration wakeup">
        <img src={IconWakeup} alt="" />
        <input
          type="time"
          value={wakeupTime}
          onChange={handleWakeupTimeChange}
          disabled={loading}
        />
        <p>に起きます</p>
      </div>
    </>
  );
};

export default Declaration;
