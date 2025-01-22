import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgMusic from "./assets/timerBg.mp3";
import firework1 from "./assets/firework1.mp3";
import firework2 from "./assets/firework2.mp3";
import firework3 from "./assets/firework3.mp3";
import paraluman from "./assets/Paraluman.mp3";
import { Fireworks } from "@fireworks-js/react";

const targetDate = new Date("January 21, 2025 21:30:00").getTime();

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

const LetterModal = ({ showModal }: { showModal: boolean }) => {
  return (
    <div
      className={`fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-1000 ${showModal ? "opacity-100" : "opacity-0"}`}
      style={{
        pointerEvents: showModal ? "auto" : "none", // Prevent interactions when not visible
      }}
    >
      <div className="relative max-w-lg rounded-lg bg-white px-[2rem] py-[4rem] text-center shadow-xl">
        {/* "Dear My Love" at the top left */}
        <h2 className="absolute left-4 top-4 font-naturaly text-xl">
          Dear My Love,
        </h2>

        {/* Main content in the center, scrollable */}
        <div
          className="font-sans mx-0 max-h-[30vh] overflow-y-auto text-left text-sm" // Apply max-height and scroll
        >
          {/* Message content here */}
          <p className="indent-4">
            HAPPY 1ST ANNIVERSARY LOVE!!! 🥰🥰🥰 Thank you love for still being
            there for me and for us hehe. Sobrang dami na nangyari satin sa loob
            ng isang taon. Parang last year lang na kinakabahan ako umamin sayo
            at tinanong mo pa ko kung gusto kita HHWHAHA, plano ko sana umamin
            sayo after ng semester break kaso napaaga hehe tapos ayon hindi
            tuloy tayo nakatulog ng maayos HAWHHAHHWHA pero ok lang yon diba
            hehe 🥰.
          </p>
          <br></br>
          <p className="indent-4">
            Hindi ko akalain na despite sa lahat ng mga problems and struggles
            natin together na hinarap at hinaharap ngayon ay hindi pa rin tayo
            sumusuko sa isa't isa. Yung mga promises natin love, pangako ko sayo
            na tutuparin ko yon at ibibigay lahat ng best ko upang matupad ko
            ung mga binitawan kong salita hehhehe. I'm sorry love kung minsan o
            madalas ay lagi tayo nag aaway o nagkakatampuhan, I know na we're
            still young and have a lot of things to explore, know and understand
            kaya I'm trying my best to be not perfect because theres no perfect
            person but a best person for you and for us hehhehe.{" "}
          </p>
          <br></br>
          <p className="indent-4">
            Sana love malagpasan na natin ang lahat ng problema natin at hindi
            na madagdagan ng mas masakit huhu at kung mas masakit man ay wag
            tayo sumuko sa isa't isa staka sana makilala na tayo ng mga parents
            natin para makapag-date naman tayo paminsan minsan dibaaa hehhe
            hindi naman tayo magiging magastos at we can manage our work and
            money while maintaining academic and our relationship. I super super
            super super super miss you na loveeeeeeee at sobraaaa sobraaaaaa
            kitanggg loveeeeeeee hehehhee. Wag ka mawawala sakin love ha at
            hindi ko talaga kakayanin kahit ilang taon pa yung dumaan huhu.
          </p>
          <br></br>
          <p className="indent-4">
            ANYWAYSSSSS, I'M LOOKING FORWARD LOVE FOR ANOTHER YEAR 🥰😘. I LOVEE
            YOUUU LOVEEEE 🥰🥰🥰🥰🥰 AT HAPPY HAPPYYY HAPPYYYY FIRST ANNIVERSARY
            LOVEEE AS UNOFFICIAL HEHEHE SANA TALAGAAAAAAA SOOONNNNN OFFICIAL
            NAAAA!!!! AAAAAAAAA I CAN'T WAIT HEHEHEHEHHE LALO NA KAPAG 💍
            HEHEHEHEHEHEHEHEHE I LOVEEEE YOUUUUUU LOVEEEEEEEE
            MWAAAAAAAAAAAAAAAAAAAAAAAA 😘😘😘. HAPPYYYY ANNIVERSARY
            LOVEEEE!!!!!!!!
          </p>
        </div>

        {/* "From Your Love" and your name at the bottom right */}
        <div className="absolute right-4 font-naturaly text-xl">
          <h2>From Your Love,</h2>
          <p>Clarence Dale Francisco</p> {/* Add your name below */}
        </div>
      </div>
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
  const [hasEnded, setHasEnded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Track if modal should be visible
  const navigate = useNavigate();

  useEffect(() => {
    if (!isModalVisible) return;

    const paralumanAudio = new Audio(paraluman);
    paralumanAudio.loop = true;
    paralumanAudio.volume = 0.5;

    paralumanAudio.currentTime = 212;
    paralumanAudio.play().catch((err) => {
      console.error("Paraluman playback error:", err);
    });

    return () => {
      paralumanAudio.pause();
      paralumanAudio.currentTime = 0;
    };
  }, [isModalVisible]);

  useEffect(() => {
    if (!isOpen) return;

    if (isModalVisible) {
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
          audio.volume = 0.5;
        }, 1000);
      })
      .catch((err) => console.error("Audio playback error:", err));

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio, isOpen, hasEnded, isModalVisible]);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft("HAPPY 1ST ANNIVERSARY LOVEEE!! 🥰✨");
        setHasEnded(true);
        clearInterval(interval);
        setShowFireworks(true);

        setTimeout(() => {
          setIsModalVisible(true); // Show modal after 30 seconds
        }, 10000);
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
          className="rounded-lg bg-red-500 px-5 py-3 font-naturaly text-xl font-bold text-white transition hover:bg-red-600"
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

      {showFireworks && (
        <Fireworks
          options={{
            autoresize: true,
            opacity: 0.5,
            acceleration: 1.05,
            friction: 0.97,
            gravity: 1.5,
            particles: 50 + Math.floor(Math.random() * 100),
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
            zIndex: 1,
          }}
        />
      )}

      {/* Show the letter modal */}
      <LetterModal showModal={isModalVisible} />
    </div>
  );
}

export default App;
