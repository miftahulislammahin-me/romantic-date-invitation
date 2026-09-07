 "use client";

import { useEffect, useMemo, useState } from "react";

type DateDetails = {
  date: string;
  time: string;
  location: string;
};

const playfulMessages = [
  "Are you sure? 🥺",
  "Nice try 😌",
  "You can’t escape that easily ❤️",
  "NO is feeling a little shy...",
  "Try YES instead 😏",
];

const hearts = ["♥", "♡", "❤", "💕", "♥"];

function getTodayLocal() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function parseLocalDateTime(date: string, time: string) {
  return new Date(`${date}T${time}`);
}

function formatDate(date: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function formatTime(time: string) {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

export default function Home() {
  const [page, setPage] = useState<1 | 2 | 3>(1);
  const [details, setDetails] = useState<DateDetails>({ date: "", time: "", location: "" });
  const [noPos, setNoPos] = useState({ x: 50, y: 74 });
  const [noMessage, setNoMessage] = useState("");
  const [celebrating, setCelebrating] = useState(false);
  const [missing, setMissing] = useState("");
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, done: false });

  const today = useMemo(() => getTodayLocal(), []);

  useEffect(() => {
    if (page !== 3 || !details.date || !details.time) return;
    const tick = () => {
      const target = parseLocalDateTime(details.date, details.time).getTime();
      const diff = target - Date.now();
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, done: true });
        return;
      }
      const total = Math.floor(diff / 1000);
      setCountdown({
        days: Math.floor(total / 86400),
        hours: Math.floor((total % 86400) / 3600),
        minutes: Math.floor((total % 3600) / 60),
        seconds: total % 60,
        done: false,
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [page, details.date, details.time]);

  const moveNo = () => {
    const x = 15 + Math.random() * 70;
    const y = 58 + Math.random() * 30;
    setNoPos({ x, y });
    setNoMessage(playfulMessages[Math.floor(Math.random() * playfulMessages.length)]);
    window.setTimeout(() => setNoMessage(""), 1500);
  };

  const chooseYes = () => {
    setCelebrating(true);
    window.setTimeout(() => {
      setCelebrating(false);
      setPage(2);
    }, 850);
  };

  const submitPlan = () => {
    if (!details.date) return setMissing("Pick a date first 📅");
    if (!details.time) return setMissing("Pick a time too ⏰");
    if (!details.location.trim()) return setMissing("Tell me where you’d like to go 📍");
    if (parseLocalDateTime(details.date, details.time).getTime() <= Date.now()) {
      return setMissing("That date and time have already passed. Pick a future moment ❤️");
    }
    setMissing("");
    setCelebrating(true);
    window.setTimeout(() => {
      setCelebrating(false);
      setPage(3);
    }, 700);
  };

  const reset = () => {
    setDetails({ date: "", time: "", location: "" });
    setPage(1);
    setNoMessage("");
  };

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="hearts-bg" aria-hidden="true">
        {hearts.map((h, i) => <span key={i} style={{ left: `${8 + i * 21}%`, animationDelay: `${i * 1.4}s` }}>{h}</span>)}
      </div>

      {celebrating && (
        <div className="celebration" aria-hidden="true">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * .35}s`,
              animationDuration: `${.7 + Math.random() * .8}s`
            }}>{["❤", "♥", "♡", "✦"][i % 4]}</span>
          ))}
        </div>
      )}

      <div className={`screen ${page === 1 ? "active" : ""}`}>
        <section className="hero-card question-card">
          <div className="mini-badge">A tiny question for you ✨</div>
          <div className="big-heart">♥</div>
          <h1>Will you go on a date with me? <span>❤️</span></h1>
          <p>I have something special planned... but first, I need your answer. 🥺</p>

          <div className="button-stage">
            <button className="primary-btn yes-btn" onClick={chooseYes}>YES <span>❤️</span></button>
            <button
              className="secondary-btn no-btn"
              style={{ left: `${noPos.x}%`, top: `${noPos.y}%` }}
              onClick={moveNo}
              onTouchStart={moveNo}
            >NO</button>
          </div>

          <div className={`playful-message ${noMessage ? "show" : ""}`}>{noMessage}</div>
          <div className="tiny-note">made with a little courage & a lot of love ♡</div>
        </section>
      </div>

      <div className={`screen ${page === 2 ? "active" : ""}`}>
        <section className="hero-card planner-card">
          <div className="mini-badge">Step 2 · Our little plan 💌</div>
          <h2>Okay, it’s a date! <span>❤️</span></h2>
          <p>Now let’s decide when and where...</p>

          <div className="form-card">
            <label>
              <span>When should we go? 📅</span>
              <input
                type="date"
                min={today}
                value={details.date}
                onChange={(e) => setDetails({ ...details, date: e.target.value })}
              />
            </label>

            <label>
              <span>What time? ⏰</span>
              <input
                type="time"
                value={details.time}
                onChange={(e) => setDetails({ ...details, time: e.target.value })}
              />
            </label>

            <label>
              <span>Where do you want to go? 📍</span>
              <input
                type="text"
                maxLength={100}
                value={details.location}
                placeholder="Tell me where you'd like to go..."
                onChange={(e) => setDetails({ ...details, location: e.target.value })}
              />
            </label>

            {missing && <div className="missing">{missing}</div>}

            <button className="primary-btn full-btn" onClick={submitPlan}>
              Let’s Do It <span>❤️</span>
            </button>
          </div>

          <button className="back-link" onClick={() => setPage(1)}>← back to the question</button>
        </section>
      </div>

      <div className={`screen ${page === 3 ? "active" : ""}`}>
        <section className="hero-card final-card">
          <div className="mini-badge">It’s happening ✨</div>
          <div className="big-heart pulse">♥</div>
          <h2>It’s Official! <span>❤️</span></h2>
          <p>Our date is happening in...</p>

          {countdown.done ? (
            <div className="date-time-message">It’s date time! ❤️🥰</div>
          ) : (
            <div className="countdown">
              {[
                ["days", countdown.days],
                ["hours", countdown.hours],
                ["minutes", countdown.minutes],
                ["seconds", countdown.seconds],
              ].map(([label, value], i) => (
                <div className="count-box" key={label as string}>
                  <strong>{String(value).padStart(2, "0")}</strong>
                  <small>{String(label).slice(0, -1).toUpperCase()}</small>
                  {i < 3 && <i>:</i>}
                </div>
              ))}
            </div>
          )}

          <div className="details-card">
            <div><b>📅</b><span>{formatDate(details.date)}</span></div>
            <div><b>⏰</b><span>{formatTime(details.time)}</span></div>
            <div><b>📍</b><span>{details.location}</span></div>
          </div>

          <p className="final-note">No matter where we go, I’m just happy it’s with you. ❤️</p>
          <button className="back-link" onClick={reset}>plan another little adventure ↗</button>
        </section>
      </div>
    </main>
  );
}