import { useState, useEffect, useRef } from "react";
import bgMusic from "./assets/timerBg.mp3";

// Target date
const targetDate = new Date("Febuary 14, 2025 00:00:00").getTime();

const formatTime = (time: number, unit: string) => {
  return `${time} ${unit}${time > 1 ? "s" : ""}`;
};

const Heart = () => {
  // Random starting position (left) and size
  const left = Math.random() * 100; // Random left position as percentage
  const size = Math.random() * 2 + 1; // Random size multiplier between 1 and 3
  const duration = Math.random() * 10 + 25; // Random animation duration between 5 and 10 seconds

  return (
    <div
      className="absolute animate-float text-red-500"
      style={{
        left: `${left}%`,
        bottom: 0, // Start at the bottom
        animationDuration: `${duration}s`,
        fontSize: `${size}rem`, // Randomize heart size
      }}
    >
      &#10084;
    </div>
  );
};

function App() {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [hearts, setHearts] = useState<JSX.Element[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft("Time is up!");
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(
          `${formatTime(days, "day")}, ${formatTime(hours, "hour")}, ${formatTime(minutes, "minute")}, and ${formatTime(seconds, "second")}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Function to generate a new heart every 500ms
    const heartInterval = setInterval(() => {
      setHearts((prevHearts) => [...prevHearts, <Heart key={Date.now()} />]);
    }, 3000);

    return () => clearInterval(heartInterval);
  }, []);

  useEffect(() => {
    // Play the audio after the component mounts
    const timeout = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        audioRef.current.volume = 0.5;
      }
    }, 500); // Wait 500ms before playing audio to avoid autoplay blocking

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden">
      <audio ref={audioRef} src={bgMusic} loop />
      <h1 className="text-white font-bold font-valentine text-4xl">
        {timeLeft}
      </h1>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {hearts}
      </div>
    </div>
  );
}

export default App;
