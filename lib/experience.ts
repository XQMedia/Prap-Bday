/* =============================================================
   PROTOCOL 15 — experience orchestration (client only)
   Ported from the vanilla build. Called once from app/page.tsx
   inside a useEffect. Returns a cleanup function.
   ============================================================= */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LETTERS } from "./data";

export function initExperience(): () => void {
  const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) =>
    r.querySelector(s) as T | null;
  const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) =>
    Array.from(r.querySelectorAll(s)) as T[];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  gsap.registerPlugin(ScrollTrigger);

  const cleanups: Array<() => void> = [];
  const on = (t: EventTarget, ev: string, fn: EventListener, opts?: AddEventListenerOptions) => {
    t.addEventListener(ev, fn, opts);
    cleanups.push(() => t.removeEventListener(ev, fn, opts));
  };

  /* ---------- scene manager -------------------------------- */
  const scenes: Record<string, HTMLElement | null> = {
    boot: $("#boot"),
    install: $("#install"),
    ink: $("#ink"),
  };
  function showScene(name: string) {
    Object.entries(scenes).forEach(([k, el]) => {
      if (!el) return;
      const active = k === name;
      el.classList.toggle("is-active", active);
      el.classList.toggle("is-gone", !active); // must clear is-gone on the active one
    });
  }
  function hideAllScenes() {
    Object.values(scenes).forEach((el) => {
      el?.classList.remove("is-active");
      el?.classList.add("is-gone");
    });
  }

  /* ==========================================================
     01 · BOOT — drag baby photo into folder
     ========================================================== */
  function initBoot() {
    const photo = $("#photoDrag")!;
    const folder = $("#folder")!;
    const hint = $("#bootHint")!;
    let dragging = false,
      sx = 0,
      sy = 0,
      dx = 0,
      dy = 0,
      dropped = false,
      over = false;

    const near = () => {
      const p = photo.getBoundingClientRect();
      const f = folder.getBoundingClientRect();
      const pcx = p.left + p.width / 2,
        pcy = p.top + p.height / 2;
      return (
        pcx > f.left - 40 &&
        pcx < f.right + 40 &&
        pcy > f.top - 40 &&
        pcy < f.bottom + 60
      );
    };

    const down = (e: Event) => {
      if (dropped) return;
      dragging = true;
      photo.classList.add("is-dragging");
      const pt = (e as TouchEvent).touches ? (e as TouchEvent).touches[0] : (e as MouseEvent);
      sx = pt.clientX;
      sy = pt.clientY;
      e.preventDefault();
    };
    const move = (e: Event) => {
      if (!dragging) return;
      const pt = (e as TouchEvent).touches ? (e as TouchEvent).touches[0] : (e as MouseEvent);
      dx = pt.clientX - sx;
      dy = pt.clientY - sy;
      const isOver = near();
      // when held over the folder, shrink the photo so it visibly tucks IN
      const scale = isOver ? 0.42 : 1.04;
      photo.style.transform = `translate(${dx}px,${dy}px) rotate(${-4 + dx * 0.02}deg) scale(${scale})`;
      if (isOver !== over) {
        over = isOver;
        photo.classList.toggle("is-over", isOver);
        folder.classList.toggle("is-hover", isOver);
        folder.classList.toggle("is-open", isOver); // flap opens to receive it
      }
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      photo.classList.remove("is-dragging");
      if (near()) return drop();
      // snap back
      photo.classList.remove("is-over");
      folder.classList.remove("is-hover", "is-open");
      over = false;
      gsap.to(photo, {
        x: 0,
        y: 0,
        rotate: -4,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1,.6)",
        onComplete: () => {
          photo.style.transform = "";
        },
      });
      dx = dy = 0;
    };

    function drop() {
      dropped = true;
      folder.classList.add("is-open", "is-hover");
      const f = folder.getBoundingClientRect();
      const p = photo.getBoundingClientRect();
      const tx = f.left + f.width / 2 - (p.left + p.width / 2) + dx;
      const ty = f.top + f.height / 2 - (p.top + p.height / 2) + dy;
      hint.style.opacity = "0";
      gsap
        .timeline()
        .to(photo, { x: tx, y: ty, scale: 0.16, rotate: 6, duration: 0.6, ease: "power3.inOut" })
        .to(photo, { opacity: 0, duration: 0.3 }, "-=.15")
        .to(folder, { scale: 1.12, duration: 0.3, ease: "back.out(2)" }, "-=.4")
        .to(folder, { scale: 1, duration: 0.3 })
        .add(() => setTimeout(() => { showScene("install"); runInstall(); }, 350));
    }

    on(photo, "mousedown", down);
    on(photo, "touchstart", down, { passive: false });
    on(window, "mousemove", move);
    on(window, "touchmove", move, { passive: false });
    on(window, "mouseup", up);
    on(window, "touchend", up);
  }

  /* ==========================================================
     02 · INSTALL
     ========================================================== */
  function runInstall() {
    const fill = $("#installFill")!;
    const pct = $("#installPct")!;
    const status = $("#installStatus")!;
    const steps = [
      "dusting for prints…",
      "cross-referencing witnesses…",
      "decoding the note…",
      "pulling the polaroids…",
      "following the red string…",
      "almost cracked…",
    ];
    const target = 15;
    const state = { v: 0 };
    gsap.to(state, {
      v: target,
      duration: 3.4,
      ease: "power1.inOut",
      onUpdate: () => {
        const v = state.v;
        fill.style.width = (v / target) * 100 + "%";
        pct.textContent = Math.round(v) + "%";
        status.textContent = steps[Math.min(steps.length - 1, Math.floor((v / target) * steps.length))];
      },
      onComplete: () => {
        status.textContent = "file unsealed. welcome, prapti ♡";
        setTimeout(() => { showScene("ink"); runInk(); }, 900);
      },
    });
  }

  /* ==========================================================
     03 · INK WRITING
     ========================================================== */
  function runInk() {
    const line = $("#inkLine")!;
    const nib = $("#inkNib")!;
    const seq = [
      { t: "hello", hold: 900 },
      { t: "happy birthday prapti", hold: 1200 },
      { t: "15 is a strange age.", hold: 1200 },
      { t: "beware", hold: 1600, last: true },
    ];

    const write = (text: string) =>
      new Promise<void>((res) => {
        line.innerHTML = "";
        const chars = [...text].map((c) => {
          const s = document.createElement("span");
          s.className = "ch";
          s.textContent = c === " " ? " " : c;
          line.appendChild(s);
          return s;
        });
        nib.style.opacity = "1";
        let i = 0;
        const step = () => {
          if (i >= chars.length) {
            gsap.to(nib, { opacity: 0, duration: 0.4 });
            return res();
          }
          const ch = chars[i];
          ch.classList.add("on");
          const r = ch.getBoundingClientRect();
          const pr = line.parentElement!.getBoundingClientRect();
          gsap.to(nib, {
            left: r.right - pr.left,
            top: r.top - pr.top + r.height * 0.7,
            duration: 0.06,
            overwrite: true,
          });
          i++;
          setTimeout(step, reduce ? 10 : 70 + Math.random() * 60);
        };
        step();
      });

    const erase = () =>
      new Promise<void>((res) => {
        const chars = $$(".ch", line).reverse();
        chars.forEach((c, k) => setTimeout(() => c.classList.add("off"), k * 22));
        setTimeout(res, chars.length * 22 + 420);
      });

    (async () => {
      for (const s of seq) {
        await write(s.t);
        await new Promise((r) => setTimeout(r, s.hold));
        if (!s.last) await erase();
      }
      gsap.to("#ink .ink__page", { scale: 1.08, opacity: 0, duration: 1.2, ease: "power2.in" });
      setTimeout(revealDoc, 1000);
    })();
  }

  /* ==========================================================
     REVEAL MAIN DOCUMENT
     ========================================================== */
  function revealDoc() {
    hideAllScenes();
    document.body.style.overflow = "";
    const doc = $("#doc")!;
    doc.setAttribute("aria-hidden", "false");
    doc.classList.add("is-live");
    window.scrollTo(0, 0);
    initReveals();
    initWisdom();
    initAudio();
    initProtocol();
    initCelebration();
    initWish();
    initLetters();
    initEnding();
    ScrollTrigger.refresh();
  }

  /* ==========================================================
     GENERIC SCROLL REVEALS
     ========================================================== */
  function initReveals() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    $$(".reveal").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    $$("#fifteenNum span").forEach((s, i) => {
      gsap.to(s, {
        yPercent: i ? 8 : -8,
        ease: "none",
        scrollTrigger: { trigger: "#fifteen", start: "top bottom", end: "bottom top", scrub: true },
      });
    });
  }

  /* ==========================================================
     05 · WISDOM CARD ANIMATIONS (cards rendered by React)
     ========================================================== */
  function initWisdom() {
    $$(".wcard").forEach((c, i) => {
      gsap.fromTo(
        c,
        { opacity: 0, y: 60, rotate: i % 2 ? 1.5 : -1.5 },
        {
          opacity: 1,
          y: 0,
          rotate: i % 2 ? 1 : -1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: c, start: "top 82%" },
        }
      );
    });
  }

  /* ==========================================================
     EVIDENCE: AUDIO — ENHYPEN player (visual only)
     ========================================================== */
  function initAudio() {
    const tracks = $$<HTMLElement>(".track");
    const setPlaying = (el: HTMLElement | null) => {
      tracks.forEach((t) => t.classList.toggle("is-playing", t === el));
    };
    tracks.forEach((t) => {
      on(t, "click", () => {
        const already = t.classList.contains("is-playing");
        setPlaying(already ? null : t);
        if (!already) tryMusic();
      });
    });
    // auto-cue the favourite track when the player scrolls into view
    const fav = tracks.find((t) => /♡/.test(t.textContent || "")) || tracks[0];
    if (fav) {
      ScrollTrigger.create({
        trigger: "#player",
        start: "top 70%",
        once: true,
        onEnter: () => setPlaying(fav),
      });
    }
  }

  /* ==========================================================
     06 · PROTOCOL — PINNED, bar scrubs with scroll
     ========================================================== */
  function initProtocol() {
    const fill = $("#protocolFill")!;
    const hint = $("#protocolHint")!;
    ScrollTrigger.create({
      trigger: "#protocol",
      start: "top top",
      end: "+=120%",
      pin: true,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        fill.style.width = self.progress * 100 + "%";
        hint.style.opacity = self.progress > 0.95 ? "0" : "";
      },
    });
    gsap.fromTo(
      "#protocol .protocol__title",
      { opacity: 0.2, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: "#protocol", start: "top 70%" },
      }
    );
  }

  /* ==========================================================
     07 · CELEBRATION — particles + music
     ========================================================== */
  function initCelebration() {
    const sky = $("#celebrateSky")!;
    const colors = ["#ee87b4", "#c9a6dd", "#e11d48", "#e6b85c", "#f9aecd", "#8a5aa8", "#fff"];
    let started = false;

    function burst() {
      if (started || reduce) return;
      started = true;
      for (let i = 0; i < 60; i++) spawnConfetti();
      for (let i = 0; i < 8; i++) spawnBalloon(i);
      for (let i = 0; i < 26; i++) spawnSparkle();
    }
    function spawnConfetti() {
      const el = document.createElement("i");
      el.className = "confetti";
      const s = 6 + Math.random() * 8;
      el.style.cssText =
        `left:${Math.random() * 100}%;width:${s}px;height:${s * 1.4}px;` +
        `background:${colors[(Math.random() * colors.length) | 0]};` +
        `border-radius:${Math.random() > 0.5 ? "50%" : "2px"}`;
      sky.appendChild(el);
      gsap.to(el, {
        y: "108vh",
        x: (Math.random() - 0.5) * 220,
        rotationZ: Math.random() * 720,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 5,
        ease: "none",
        repeat: -1,
        onRepeat: () => { el.style.left = Math.random() * 100 + "%"; },
      });
      gsap.to(el, { opacity: 0, duration: 1, delay: 4 + Math.random() * 4, repeat: -1, repeatDelay: 4 });
    }
    function spawnBalloon(i: number) {
      const el = document.createElement("i");
      el.className = "balloon";
      el.style.cssText =
        `left:${6 + i * 12 + Math.random() * 4}%;` +
        `background:radial-gradient(circle at 35% 30%,#fff,${colors[i % colors.length]});`;
      sky.appendChild(el);
      gsap.to(el, {
        y: "-140vh",
        x: `+=${(Math.random() - 0.5) * 80}`,
        duration: 12 + Math.random() * 8,
        delay: Math.random() * 6,
        ease: "none",
        repeat: -1,
      });
      gsap.to(el, { rotation: (Math.random() - 0.5) * 16, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }
    function spawnSparkle() {
      const el = document.createElement("i");
      el.className = "sparkle";
      el.textContent = Math.random() > 0.5 ? "✦" : "✧";
      el.style.cssText =
        `left:${Math.random() * 100}%;top:${Math.random() * 100}%;font-size:${8 + Math.random() * 14}px`;
      sky.appendChild(el);
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1.2, duration: 1 + Math.random(), repeat: -1, yoyo: true, delay: Math.random() * 3, ease: "sine.inOut" }
      );
    }

    ScrollTrigger.create({
      trigger: "#celebrate",
      start: "top 70%",
      onEnter: () => {
        burst();
        tryMusic();
        $("#musicToggle")!.classList.add("is-shown");
        $("#solvedStamp")?.classList.add("stamp--pop");
      },
    });
  }

  /* ==========================================================
     MUSIC — real file if present, else in-browser music box
     ========================================================== */
  const Music = (() => {
    const audio = $("#bgm") as HTMLAudioElement | null;
    let mode: "file" | "synth" | null = null,
      isOn = false,
      ctx: AudioContext | null = null,
      gain: GainNode | null = null,
      loopTimer: number | null = null,
      hasFile = false;

    if (audio) audio.addEventListener("canplay", () => { hasFile = true; });

    const notes = [
      587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 587.33, 659.25, 493.88, 523.25, 587.33,
      523.25, 493.88, 440.0, 493.88, 523.25,
    ];
    function synthStart() {
      if (ctx) return;
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AC();
      gain = ctx.createGain();
      gain.gain.value = 0;
      gain.connect(ctx.destination);
      gsap.to(gain.gain, { value: 0.18, duration: 2 });
      let i = 0;
      const play = () => {
        if (!ctx || !gain) return;
        const t = ctx.currentTime;
        const o = ctx.createOscillator(),
          g = ctx.createGain();
        o.type = "triangle";
        o.frequency.value = notes[i % notes.length];
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.6, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
        o.connect(g);
        g.connect(gain);
        o.start(t);
        o.stop(t + 0.95);
        if (i % 4 === 0) {
          const o2 = ctx.createOscillator(),
            g2 = ctx.createGain();
          o2.type = "sine";
          o2.frequency.value = notes[i % notes.length] / 2;
          g2.gain.setValueAtTime(0, t);
          g2.gain.linearRampToValueAtTime(0.25, t + 0.05);
          g2.gain.exponentialRampToValueAtTime(0.001, t + 1.4);
          o2.connect(g2);
          g2.connect(gain);
          o2.start(t);
          o2.stop(t + 1.5);
        }
        i++;
      };
      play();
      loopTimer = window.setInterval(play, 420);
    }
    function synthStop() {
      if (gain) gsap.to(gain.gain, { value: 0, duration: 0.6 });
      if (loopTimer) clearInterval(loopTimer);
      loopTimer = null;
      setTimeout(() => { if (ctx) { ctx.close(); ctx = null; } }, 700);
    }

    return {
      start() {
        if (isOn) return;
        if (hasFile && audio) {
          audio.volume = 0;
          audio
            .play()
            .then(() => { mode = "file"; isOn = true; gsap.to(audio, { volume: 0.6, duration: 2 }); })
            .catch(() => { mode = "synth"; synthStart(); isOn = true; });
        } else {
          mode = "synth";
          synthStart();
          isOn = true;
        }
      },
      stop() {
        if (!isOn) return;
        isOn = false;
        if (mode === "file" && audio)
          gsap.to(audio, { volume: 0, duration: 0.5, onComplete: () => audio.pause() });
        else synthStop();
      },
      duck(v: boolean) {
        if (!isOn) return;
        if (mode === "file" && audio) gsap.to(audio, { volume: v ? 0.15 : 0.6, duration: 0.8 });
        else if (gain) gsap.to(gain.gain, { value: v ? 0.05 : 0.18, duration: 0.8 });
      },
      get on() { return isOn; },
    };
  })();

  function tryMusic() { if (!Music.on) Music.start(); }

  function initMusicToggle() {
    const btn = $("#musicToggle");
    if (!btn) return;
    const label = btn.querySelector(".music-toggle__label")!;
    on(btn, "click", () => {
      if (Music.on) { Music.stop(); btn.classList.add("is-off"); label.textContent = "music off"; }
      else { Music.start(); btn.classList.remove("is-off"); label.textContent = "music on"; }
    });
    const kick = () => { tryMusic(); window.removeEventListener("pointerdown", kick); window.removeEventListener("keydown", kick); };
    on(window, "pointerdown", kick);
    on(window, "keydown", kick);
  }

  /* ==========================================================
     08 · BIRTHDAY WISH — PINNED, scroll drives the moment
     ========================================================== */
  function initWish() {
    const decos = $$(".wish__deco");
    const cake = $("#cake")!;
    const flame = $("#cakeFlame")!;
    const dark = $("#wishDark")!;
    const hint = $("#wishHint")!;
    const lines = {
      make: $('[data-step="make"]')!,
      blow: $('[data-step="blow"]')!,
      count: $("#wishCount")!,
    };
    let blown = false;

    const vecs = new WeakMap<HTMLElement, { x: number; y: number }>();
    let vectorsReady = false;
    const computeVectors = () => {
      const cx = window.innerWidth / 2,
        cy = window.innerHeight / 2;
      decos.forEach((d) => {
        const r = d.getBoundingClientRect();
        vecs.set(d, { x: (r.left + r.width / 2 - cx) * 1.6, y: (r.top + r.height / 2 - cy) * 1.6 });
      });
      vectorsReady = true;
    };

    const setLine = (el: HTMLElement, show: boolean) =>
      gsap.to(el, { opacity: show ? 1 : 0, y: show ? 0 : 10, duration: 0.4, overwrite: "auto" });

    function blowOut() {
      if (blown) return;
      blown = true;
      flame.classList.add("is-out");
      Music.duck(true);
      const smoke = $("#cakeSmoke")!;
      gsap.set(smoke, { opacity: 0.7, scale: 1 });
      gsap.to(smoke, { y: -80, x: 14, scale: 4, opacity: 0, duration: 2, ease: "power1.out" });
      gsap
        .timeline()
        .to(dark, { opacity: 0.82, duration: 0.5 })
        .to(dark, { opacity: 0, duration: 1.4, ease: "power2.inOut" }, "+=.5")
        .add(() => Music.duck(false));
    }
    function relight() {
      if (!blown) return;
      blown = false;
      flame.classList.remove("is-out");
      gsap.set($("#cakeSmoke")!, { opacity: 0 });
      Music.duck(false);
    }

    ScrollTrigger.create({
      trigger: "#wish",
      start: "top top",
      end: "+=180%",
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        if (!vectorsReady) computeVectors();
        const dp = Math.min(1, p / 0.35);
        decos.forEach((d) => {
          const v = vecs.get(d) || { x: 0, y: 0 };
          gsap.set(d, { x: v.x * dp, y: v.y * dp, opacity: 1 - dp });
        });
        gsap.set(cake, { scale: 1 + dp * 0.12, y: -dp * 10 });
        hint.style.opacity = p > 0.05 ? "0" : "";

        setLine(lines.make, p > 0.34 && p < 0.5);
        setLine(lines.blow, p > 0.5 && p < 0.62);

        let n = 0;
        if (p >= 0.62 && p < 0.72) n = 3;
        else if (p >= 0.72 && p < 0.82) n = 2;
        else if (p >= 0.82 && p < 0.9) n = 1;
        if (n) { lines.count.textContent = String(n); gsap.set(lines.count, { opacity: 1 }); }
        else gsap.set(lines.count, { opacity: 0 });

        if (p >= 0.9) blowOut();
        else relight();
      },
    });
  }

  /* ==========================================================
     09 · SECRET LETTERS + quiz modal
     ========================================================== */
  const readSet = new Set<number>();

  function initLetters() {
    $$<HTMLButtonElement>(".envelope").forEach((env) => {
      const i = Number(env.dataset.index);
      gsap.fromTo(
        env,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.12,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: "#letters", start: "top 65%" },
        }
      );
      on(env, "click", () => openLetter(i, env));
    });

    $("#modalClose") && on($("#modalClose")!, "click", closeModal);
    $("#modalBackdrop") && on($("#modalBackdrop")!, "click", closeModal);
    on(window, "keydown", (e) => { if ((e as KeyboardEvent).key === "Escape") closeModal(); });
  }

  function openLetter(i: number, env: HTMLElement) {
    const L = LETTERS[i];
    const modal = $("#letterModal")!;
    const quiz = $("#modalQuiz")!;
    const reveal = $("#modalReveal")!;
    const choicesEl = $("#modalChoices")!;
    $("#modalBody")!.textContent = L.body;
    $(".modal__sign")!.textContent = "— ?";
    quiz.classList.remove("is-shown");
    reveal.classList.remove("is-shown");
    choicesEl.innerHTML = "";

    const opts = [...L.choices].sort(() => Math.random() - 0.5);
    opts.forEach((name) => {
      const b = document.createElement("button");
      b.className = "choice";
      b.textContent = name;
      b.addEventListener("click", () => {
        if (name === L.answer) {
          b.classList.add("is-right");
          $$<HTMLButtonElement>(".choice", choicesEl).forEach((c) => (c.disabled = true));
          $(".modal__sign")!.textContent = "— " + L.name;
          $("#modalFace")!.innerHTML =
            `<img src="${L.photo}" alt="${L.name}" onerror="this.onerror=null;this.src='/assets/friend-fallback.svg'">`;
          $("#modalName")!.textContent = "it was " + L.name + "! ♡";
          setTimeout(() => reveal.classList.add("is-shown"), 300);
        } else {
          b.classList.add("is-wrong");
          b.disabled = true;
        }
      });
      choicesEl.appendChild(b);
    });

    const next = $("#modalNext")! as HTMLButtonElement;
    const nextIdx = LETTERS.findIndex((_, k) => k > i && !readSet.has(k));
    next.textContent = nextIdx > -1 ? "next letter →" : "close ♡";
    next.onclick = () => {
      closeModal();
      if (nextIdx > -1)
        setTimeout(() => {
          const envs = $$<HTMLButtonElement>(".envelope");
          envs[nextIdx].scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => openLetter(nextIdx, envs[nextIdx]), 700);
        }, 300);
    };

    readSet.add(i);
    env.classList.add("is-read");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    setTimeout(() => quiz.classList.add("is-shown"), 1400);
  }

  function closeModal() {
    const modal = $("#letterModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  /* ==========================================================
     10 · ENDING — floating stars
     ========================================================== */
  function initEnding() {
    const box = $("#endingStars")!;
    for (let i = 0; i < 40; i++) {
      const s = document.createElement("i");
      s.className = "ending__star";
      s.textContent = Math.random() > 0.7 ? "✦" : "·";
      s.style.cssText =
        `left:${Math.random() * 100}%;top:${Math.random() * 100}%;` +
        `font-size:${6 + Math.random() * 14}px;animation-delay:${Math.random() * 3}s`;
      box.appendChild(s);
    }
  }

  /* ==========================================================
     BOOT UP
     ========================================================== */
  document.body.style.overflow = "hidden";
  showScene("boot");
  initBoot();
  initMusicToggle();

  // debug: ?debug&to=doc|install|ink jumps straight to a scene while editing
  if (/[?&]debug/.test(location.search)) {
    const to = new URLSearchParams(location.search).get("to");
    if (to === "doc") revealDoc();
    else if (to === "install") { showScene("install"); runInstall(); }
    else if (to === "ink") { showScene("ink"); runInk(); }
  }

  /* ---------- cleanup (React StrictMode / unmount) --------- */
  return () => {
    cleanups.forEach((fn) => fn());
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.globalTimeline.clear();
    Music.stop();
    document.body.style.overflow = "";
  };
}
