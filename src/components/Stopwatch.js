import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  let interval;

  useEffect(() => {
    if (running) {
      interval = setInterval(updateTime, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const updateTime = () => {
    setMilliseconds(prevMilliseconds => {
      if (prevMilliseconds + 10 === 1000) {
        setSeconds(prevSeconds => {
          if (prevSeconds + 1 === 60) {
            setMinutes(prevMinutes => {
              if (prevMinutes + 1 === 60) {
                setHours(prevHours => prevHours + 1);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
        return 0;
      }
      return prevMilliseconds + 10;
    });
  };

  const start = () => {
    setRunning(true);
  };

  const pause = () => {
    setRunning(false);
  };

  const reset = () => {
    setRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
    setLaps([]);
  };

  const lap = () => {
    if (running) {
      const lapTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${(milliseconds / 10).toString().padStart(2, '0')}`;
      setLaps([...laps, lapTime]);
    }
  };

  return (
    <div className="stopwatch">
      <div className="display">
        <span id="hours">{hours.toString().padStart(2, '0')}</span>:
        <span id="minutes">{minutes.toString().padStart(2, '0')}</span>:
        <span id="seconds">{seconds.toString().padStart(2, '0')}</span>:
        <span id="milliseconds">{(milliseconds / 10).toString().padStart(2, '0')}</span>
      </div>
      <div className="buttons">
        <button onClick={start} disabled={running}>Start</button>
        <button onClick={pause} disabled={!running}>Pause</button>
        <button onClick={reset}>Reset</button>
        <button onClick={lap}>Lap</button>
      </div>
      <div className="laps">
        <h3>Lap Times</h3>
        <ul id="lapsList">
          {laps.map((lap, index) => (
            <li key={index}>{lap}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stopwatch;
