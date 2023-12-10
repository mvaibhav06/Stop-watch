import { useState, useEffect } from "react";

const Body = () => {
  const [startTime, setStartTime] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState(null);

  const [text, setText] = useState("00:00:00");

  const handleStart = () => {
    if (time) {
      let currentTime = new Date().getTime();
      let t1 = time;

      let diff = currentTime - t1;
      setStartTime(startTime + diff);
    } else {
      let d = new Date().getTime();
      setStartTime(d);
    }
    setIsStarted(true);
  };

  const handleStop = () => {
    setIsStarted(false);
  };

  const handleReset = () => {
    setIsStarted(false);
    setStartTime(0);
    setTime(null);
    setText("00:00:00");
  };

  const convertSeconds = (seconds) => {
    if (seconds < 0 || isNaN(seconds)) {
      return "00:00:00";
    }
    if (seconds > 59) {
      let minutes = Math.floor(seconds / 60);
      seconds = seconds - minutes * 60;
      if (minutes > 60) {
        let hours = Math.floor(minutes / 60);
        minutes = minutes - hours * 60;

        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
        if (minutes < 10) {
          minutes = `0${minutes}`;
        }
        if (hours < 10) {
          hours = `0${hours}`;
        }

        return `${hours}:${minutes}:${seconds}`;
      } else {
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
        if (minutes < 10) {
          minutes = `0${minutes}`;
        }

        return `00:${minutes}:${seconds}`;
      }
    } else {
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `00:00:${seconds}`;
    }
  };

  useEffect(() => {
    let timeInterval;

    if (isStarted) {
      timeInterval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = new Date().getTime();
          let startedTime = startTime;
          let seconds = Math.floor((newTime - startedTime) / 1000);
          setText(convertSeconds(seconds));
          return newTime;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timeInterval);
    };
  }, [isStarted, startTime]);

  return (
    <div className="text-center">
      <h1 style={{ fontSize: "8.5rem" }}>{text}</h1>

      <div className="btns">
        <button className="btn btn-secondary" onClick={handleStart}>
          start
        </button>
        <button className="btn btn-secondary" onClick={handleStop}>
          Stop
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Body;
