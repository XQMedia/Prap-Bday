/* =============================================================
   EDIT ME — everything personal lives here.
   ============================================================= */

export type Letter = {
  name: string;
  seal: string;
  body: string;
  choices: string[];
  answer: string; // must exactly match one of `choices`
  photo: string; // put the real file in /public/assets
};

export const LETTERS: Letter[] = [
  {
    name: "Ananya",
    seal: "A",
    body:
      "prapti!! happy birthday to my partner in every dumb idea we've ever had. " +
      "thank you for laughing at my jokes even the bad ones. fifteen is going to " +
      "be YOUR year, i can feel it. love you endlessly.",
    choices: ["Ananya", "Riya", "Sara"],
    answer: "Ananya",
    photo: "/assets/friend1.jpg",
  },
  {
    name: "Kabir",
    seal: "K",
    body:
      "happiest birthday, poet. never stop scribbling in the margins and sending " +
      "me songs at 2am. the world is softer because you're in it. go be fifteen " +
      "and unstoppable.",
    choices: ["Aarav", "Kabir", "Dev"],
    answer: "Kabir",
    photo: "/assets/friend2.jpg",
  },
  {
    name: "Meher",
    seal: "M",
    body:
      "to the kindest human i know — happy birthday!! remember that time we got " +
      "lost and called it an adventure? that's just you, always turning ordinary " +
      "days into stories. here's to a hundred more.",
    choices: ["Meher", "Zoya", "Ira"],
    answer: "Meher",
    photo: "/assets/friend3.jpg",
  },
];

/* EVIDENCE: AUDIO — the case soundtrack (ENHYPEN).
   Swap in Prapti's real favourites; mark her bias track with `fav: true`. */
export type Track = { name: string; dur: string; fav?: boolean };

export const PLAYLIST = {
  title: "The Fifteen Files — OST",
  by: "recovered audio · ENHYPEN",
  tracks: [
    { name: "Polaroid Love", dur: "3:16", fav: true },
    { name: "Bite Me", dur: "2:58" },
    { name: "Sweet Venom", dur: "3:05" },
    { name: "Given-Taken", dur: "3:29" },
    { name: "Future Perfect (Pass the MIC)", dur: "3:11" },
    { name: "Fatal Trouble", dur: "3:20" },
  ] as Track[],
};

/* the closing note in the ending scene */
export const ENDING_POEM = [
  "case №15, closed with love:",
  "may your year be all soft mornings and loud songs,",
  "tulips on the sill, poems in the margins,",
  "thrillers you can't put down —",
  "and every mystery worth solving.",
];

export type Wisdom = { topic: string; mark: string; text: string };

export const WISDOM: Wisdom[] = [
  { topic: "on friendships", mark: "❀", text: "Keep the friends who make you feel more like yourself, not less. A few real ones beat a crowd." },
  { topic: "on confidence", mark: "✦", text: "Confidence isn't being the loudest in the room. It's being quietly sure you'll be okay." },
  { topic: "on failure", mark: "☾", text: "Every failure is just data. You are allowed to be a beginner at things. That's how the good stories start." },
  { topic: "on trying new things", mark: "✿", text: "Say yes to the thing that scares you a little. The best parts of you are on the other side of new." },
  { topic: "on staying kind", mark: "♡", text: "Kindness is never wasted — least of all the kindness you give yourself on the hard days." },
  { topic: "on comparison", mark: "❁", text: "Don't measure your behind-the-scenes against someone else's highlight reel. You're on your own timeline." },
  { topic: "on the little moments", mark: "✧", text: "Notice the small good things — a song, a sky, a laugh. A life is mostly made of little moments." },
  { topic: "on writing & music", mark: "♪", text: "Write the poems. Play the songs. The things that make you feel are the things worth keeping." },
  { topic: "on dreams", mark: "★", text: "Dream loudly and a little unreasonably. You have so much time to become who you're becoming." },
];
