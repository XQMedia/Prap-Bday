"use client";

import { useState } from "react";

type Letter = {
  name: string;
  seal: string;
  answer: string;
  body: string;
  bf?: boolean;
  photo?: string;
};

const LETTERS: Letter[] = [
  {
    name: "Arushi",
    seal: "A",
    answer: "arushi",
    body: `HAPPIEST BIRTHDAY BBG,

ILYSMMMMM  Thank you for being there for me I hope i was always there for you the way u were for mee. Ur so freaking pretty bhaii💋💋💋💋. Aalok genuinely lucked out. U are as pretty as Barbaad btw💌💌. We have shared so many beautiful moments together. I can't believe ik you for almost 12 YRS!!! Thank you for being my bsf I'm so lucky to have you. I can't decide which memory of us is the best because like every moment with you is the best. The hardest part of my 15yrs of life is when we had our fights. Im so grateful we got past that. I really appreciate what you have done for me. Again ilysmmmm 💖💖💖`,
  },
  {
    name: "Aarohi",
    seal: "A",
    answer: "aarohi",
    body: `Hey Prapti
Happy birthday beautiful

There were days when no one was there beside me, no one was there to listen to me, no one was there to tell me I'm wrong or right but you were. Thanks for making me feel seen even when the person I called my best friend couldn't care less.. Thanks for being my personal unpaid therapist and im so grateful to have you in my life. It's my pleasure to always listen to your problems and sort them out with you. Always remember, if you think you have no one by your side, remember I exist. You're perfect the way you are so don't doubt yourself. I love you so much my girl... Never lose this charm.. Lots of love
Once again happy birthday`,
  },
  {
    name: "Aalok",
    seal: "♡",
    answer: "aalok",
    bf: true,
    photo: "/assets/aalok.jpeg",
    body: `HAPPYY BIRTHDAYYY PRAAPTIII 🫶🫶🫶🫶

Honestly I still cannot believe you are still in my life and have become such an important person tooo. 🥺🥺 Tor sathe kotha na bolle din ta complete hoinaa. Sei random "ki korchis?" , useless arguments, tor natokk amar faltu jokess.😛😛😛 Also, one thing ik how much youu doubt yourself but in my eyess you aree the mosssttt perfect girll I've eveeerrrr seeennn 💗💗💗. Tai aajke kono overthinking naaa because todayy isn't about yourr markss, your problems or the badd dayss you've hadd. ☝️😻

AGAIN HAPPYY BIRTHDAYYY PRAAPRTII ENJOY YOURR DAYY TOO THEE FULLEST 💗💗💗`,
  },
  {
    name: "Koushani",
    seal: "K",
    answer: "koushani",
    body: `happppyyyy birthday praptiiii

May this day be as beautiful as you are.. you have always been perfect for sharing and caring... im really grateful to have such a sweet friend like you in my life.. always stay this chaotic and beautiful 😍.. lovee youuu🫶🏻`,
  },
];

export default function LettersSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [guess, setGuess] = useState("");
  const [msg, setMsg] = useState("");
  const [shake, setShake] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [read, setRead] = useState<Set<number>>(new Set());

  const L = open !== null ? LETTERS[open] : null;

  const openLetter = (i: number) => {
    setOpen(i);
    setGuess("");
    setMsg("");
    setRevealed(false);
    setAttempts(0);
  };
  const close = () => setOpen(null);

  const doShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const reveal = () => {
    setRevealed(true);
    if (open !== null) setRead((r) => new Set(r).add(open));
  };

  const submit = () => {
    if (!L || revealed) return;
    const g = guess.trim().toLowerCase();
    if (!g) {
      doShake();
      return;
    }
    if (L.bf) {
      // Aalok: first guess is always "wrong", then jk — it was Aalok all along
      if (attempts === 0) {
        setAttempts(1);
        setMsg("incorrect ❌");
        doShake();
      } else {
        reveal();
      }
    } else if (g === L.answer) {
      reveal();
    } else {
      setMsg("not quite… try again ♡");
      doShake();
    }
  };

  const nextUnread = open !== null ? LETTERS.findIndex((_, k) => k !== open && !read.has(k)) : -1;

  return (
    <section className="letters" id="letters" aria-label="Letters">
      <p className="letters__eyebrow reveal">recovered from her locker</p>
      <h2 className="letters__title reveal">the people who love you</h2>
      <p className="letters__hint reveal">open a letter — then type who you think wrote it</p>

      <div className="letters__grid reveal">
        {LETTERS.map((_letter, i) => (
          <button
            className={`env ${read.has(i) ? "read" : ""}`}
            key={i}
            onClick={() => openLetter(i)}
            aria-label={`Open letter ${i + 1}`}
          >
            <span className="env__body" />
            <span className="env__flap" />
            <span className="env__seal" />
            <span className="env__tag">sealed · {String(i + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      <div className={`lmodal ${open !== null ? "open" : ""}`} aria-hidden={open === null}>
        <div className="lmodal__bg" onClick={close} />
        {L && (
          <div className="lmodal__card" role="dialog" aria-modal="true">
            <button className="lmodal__close" onClick={close} aria-label="Close">
              ×
            </button>
            <p className="lmodal__from">a letter for prapti</p>
            <p className="lmodal__body">{L.body}</p>
            <p className="lmodal__sign">— {revealed ? (L.bf ? "Aalok 💗" : L.name) : "?"}</p>

            {!revealed && (
              <div className="guess">
                <p className="guess__q">who wrote this?</p>
                <div className="guess__row">
                  <input
                    className={`guess__input ${shake ? "shake" : ""}`}
                    placeholder="type their name…"
                    value={guess}
                    onChange={(e) => {
                      setGuess(e.target.value);
                      setMsg("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && submit()}
                    autoFocus
                  />
                  <button className="guess__btn" onClick={submit}>
                    guess
                  </button>
                </div>
                <p className="guess__msg">{msg}</p>
              </div>
            )}

            {revealed && (
              <div className="lreveal">
                {L.bf ? (
                  <>
                    <span className="lreveal__heart">❤️</span>
                    <div className="lreveal__face">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={L.photo} alt="Aalok" />
                    </div>
                    <p className="lreveal__name">jk it was Aalok</p>
                  </>
                ) : (
                  <>
                    <span className="lreveal__heart">♡</span>
                    <p className="lreveal__name">it was {L.name}!</p>
                  </>
                )}
                <div className="lreveal__next">
                  <button
                    className="guess__btn"
                    onClick={() => (nextUnread > -1 ? openLetter(nextUnread) : close())}
                  >
                    {nextUnread > -1 ? "next letter →" : "close ♡"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
