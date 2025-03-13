import React from "react";

interface TimerProps {
  timeLeft: number;
  isSession: boolean;
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const Timer: React.FC<TimerProps> = ({ timeLeft, isSession }) => {
  return (
    <div className="flex flex-col items-center my-6">
      <h2 id="timer-label" className="text-2xl">{isSession ? "Session" : "Break"}</h2>
      <div id="time-left" className="text-4xl font-bold">{formatTime(timeLeft)}</div>
    </div>
  );
};

export default Timer;
