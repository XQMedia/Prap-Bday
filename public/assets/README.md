# Assets — drop your real photos here

Everything works out of the box with hand-drawn placeholders. To personalise it,
add these files (any of them — a missing one just falls back to a placeholder):

| File          | Where it shows                        | Suggested size      |
|---------------|---------------------------------------|---------------------|
| `baby.jpg`    | Scene 01 — the photo you drag in      | portrait, ~800×1000 |
| `friend1.jpg` | Secret letter 1 reveal (Ananya)       | square, ~600×600    |
| `friend2.jpg` | Secret letter 2 reveal (Kabir)        | square, ~600×600    |
| `friend3.jpg` | Secret letter 3 reveal (Meher)        | square, ~600×600    |
| `music.mp3`   | Background song for the celebration   | any mp3             |

These live in `public/assets/`, so a file dropped here is served at `/assets/<name>`.

**Names, letters & quiz answers** live in [`../../lib/data.ts`](../../lib/data.ts)
— edit the `name`, `body`, `choices`, `answer`, and `photo` fields to match
Prapti's real friends. The `answer` must exactly match one of the `choices`.

If you don't add `music.mp3`, a soft music-box melody is synthesised in the
browser automatically, so there's always sound.
