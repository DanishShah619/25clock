import { useState, useEffect, useRef } from "react";

const Clock = () => {
  const [timerOn, setTimerOn] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60); 

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerOn) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            if (audioRef.current) {
              audioRef.current.play();
            }
            setIsBreak((prevIsBreak) => !prevIsBreak);
            return isBreak ? sessionTime * 60 : breakTime * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current as NodeJS.Timeout);
    }

    return () => clearInterval(timerRef.current as NodeJS.Timeout);
  }, [timerOn, isBreak, sessionTime, breakTime]);

  const resetTimer = () => {
    setTimerOn(false);
    setIsBreak(false);
    setBreakTime(5);
    setSessionTime(25);
    setTimeLeft(25 * 60); // ✅ Ensures 25:00 on reset
    clearInterval(timerRef.current as NodeJS.Timeout);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`; // ✅ Always ensures mm:ss format
  };

  return (
    <div className="clock-container">
      <h2>25 + 5 Clock</h2>
      
      <div className="length-controls">
        <div>
          <h3 id="break-label">Break Length</h3>
          <button id="break-decrement" onClick={() => setBreakTime((t) => Math.max(1, t - 1))}>-</button>
          <span id="break-length">{breakTime}</span>
          <button id="break-increment" onClick={() => setBreakTime((t) => Math.min(60, t + 1))}>+</button>
        </div>

        <div>
          <h3 id="session-label">Session Length</h3>
          <button id="session-decrement" onClick={() => {
            if (sessionTime > 1) {
              setSessionTime(sessionTime - 1);
              setTimeLeft((sessionTime - 1) * 60); // ✅ Update `timeLeft` when session changes
            }
          }}>-</button>
          <span id="session-length">{sessionTime}</span>
          <button id="session-increment" onClick={() => {
            if (sessionTime < 60) {
              setSessionTime(sessionTime + 1);
              setTimeLeft((sessionTime + 1) * 60); // ✅ Update `timeLeft` when session changes
            }
          }}>+</button>
        </div>
      </div>

      <div className="timer">
        <h3 id="timer-label">{isBreak ? "Break" : "Session"}</h3>
        <div id="time-left">{formatTime(timeLeft)}</div> {/* ✅ Always in mm:ss format */}
      </div>

      <div className="controls">
        <button id="start_stop" onClick={() => setTimerOn((prev) => !prev)}>
          {timerOn ? "Pause" : "Start"}
        </button>
        <button id="reset" onClick={resetTimer}>Reset</button>
      </div>

      <audio ref={audioRef} id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" preload="auto"></audio>
    </div>
  );
};

export default Clock;



