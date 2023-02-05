import React from "react";
import { useEffect, useState } from "react";

export default function TimeRemain({ timeData }) {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [timeOver, setTimeOver] = useState(true);

  const getRemaningTime = () => {
    const now = new Date().valueOf();
    const _time = new Date(timeData * 1000 - now).valueOf();
    if (now >= new Date(timeData * 1000).valueOf()) {
      setTimeOver(true);
    } else {
      setTimeOver(false);
    }
    const days = Math.floor(_time / (24 * 60 * 60 * 1000));
    const hours = Math.floor((_time / (60 * 60 * 1000)) % 24);
    const minutes = Math.floor((_time / (60 * 1000)) % 60);
    const seconds = Math.floor((_time / 1000) % 60);
    setRemainingTime({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    if (timeData) {
      const handler = setInterval(() => {
        getRemaningTime();
      }, 1000);

      return () => clearInterval(handler);
    }
  }, [timeData]);
  return (
    <div>
      {timeOver ? (
        <p className="text-red-500 font-medium">TIME OVER</p>
      ) : (
        <p>{`${remainingTime.days}d ${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s`}</p>
      )}
    </div>
  );
}
