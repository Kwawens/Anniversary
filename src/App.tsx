import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgMusic from "./assets/timerBg.mp3";
import firework1 from "./assets/firework1.mp3";
import firework2 from "./assets/firework2.mp3";
import firework3 from "./assets/firework3.mp3";
import { Fireworks } from "@fireworks-js/react";

// Target date
const targetDate = new Date("January 21, 2025 22:24:00").getTime();

const formatTime = (time: number, unit: string) => {
  return `${time} ${unit}${time > 1 ? "s" : ""}`;
};

const Heart = () => {
  const left = Math.random() * 100;
  const size = Math.random() * 2 + 1;
  const duration = Math.random() * 10 + 25;

  return (
    <div
      className="absolute animate-float text-red-500"
      style={{
        left: `${left}%`,
        bottom: 0,
        animationDuration: `${duration}s`,
        fontSize: `${size}rem`,
      }}
    >
      &#10084;
    </div>
  );
};

function App() {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [hearts, setHearts] = useState<JSX.Element[]>([]);
  const [audio] = useState(new Audio(bgMusic));
  const [heartIntervalTime, setHeartIntervalTime] = useState(3000);
  const [isOpen, setIsOpen] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [hasEnded, setHasEnded] = useState(false); // Added state to track if the timer has ended

  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    if (!isOpen) return;

    if (hasEnded) {
      // Stop the music when the timer ends
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    audio.loop = true;
    audio.volume = 0;

    audio
      .play()
      .then(() => {
        setTimeout(() => {
          audio.volume = 0.5; // Gradually increase the volume
        }, 1000);
      })
      .catch((err) => console.error("Audio playback error:", err));

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio, isOpen, hasEnded]); // Listen for hasEnded

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft("HAPPY 1ST ANNIVERSARY LOVEEE!! 🥰✨");
        setHasEnded(true); // Mark the timer as ended
        clearInterval(interval);

        setShowFireworks(true);

        // Navigate to Flower.tsx when time is up
        setTimeout(() => {
          navigate("/flower");
        }, 30000); // Delay before navigating
      } else {
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(
          `${formatTime(hours, "hour")}, ${formatTime(minutes, "minute")}, and ${formatTime(seconds, "second")}`,
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, navigate, hasEnded]);

  useEffect(() => {
    if (!isOpen || hasEnded) return;

    const generateHeart = () => {
      if (hasEnded) return;

      setHearts((prevHearts) => [...prevHearts, <Heart key={Date.now()} />]);
      setHeartIntervalTime((prev) => Math.min(prev + 500, 5000));
    };

    const heartInterval = setInterval(generateHeart, heartIntervalTime);

    return () => clearInterval(heartInterval);
  }, [heartIntervalTime, isOpen, hasEnded]);

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="font-naturaly rounded-lg bg-red-500 px-5 py-3 text-xl font-bold text-white transition hover:bg-red-600"
        >
          Click Me! 😉
        </button>
      ) : (
        <>
          <h1 className="font-valentine font-bold text-white sm:text-2xl lg:text-6xl">
            {timeLeft}
          </h1>
          <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
            {hearts}
          </div>
        </>
      )}

      {/* Show Fireworks when time is up */}
      {showFireworks && (
        <Fireworks
          options={{
            autoresize: true,
            opacity: 0.5,
            acceleration: 1.05,
            friction: 0.97,
            gravity: 1.5,
            particles: 50 + Math.floor(Math.random() * 100), // Randomize particle count
            traceLength: 3,
            traceSpeed: 10,
            explosion: 5,
            intensity: 30,
            flickering: 50,
            lineStyle: "round",
            hue: {
              min: 0,
              max: 360,
            },
            delay: {
              min: 30,
              max: 60,
            },
            rocketsPoint: {
              min: 50,
              max: 50,
            },
            lineWidth: {
              explosion: {
                min: 1,
                max: 3,
              },
              trace: {
                min: 1,
                max: 2,
              },
            },
            brightness: {
              min: 50,
              max: 80,
            },
            decay: {
              min: 0.015,
              max: 0.03,
            },
            mouse: {
              click: false,
              move: false,
              max: 1,
            },
            sound: {
              enabled: true,
              files: [firework1, firework2, firework3],
              volume: { min: 80, max: 100 },
            },
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000,
          }}
        />
      )}
    </div>
  );
}

export default App;
