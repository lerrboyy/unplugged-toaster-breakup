# Unplugged: A Smart Toaster's Breakup Line

[![Competition](https://make.fun/badge/u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92.svg)](https://make.fun/bounty/u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92)
[![Rank](https://make.fun/badge/u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92/lerrboyy/unplugged-toaster-breakup/rank.svg)](https://make.fun/bounty/u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92)
[![Reward](https://make.fun/badge/u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92/lerrboyy/unplugged-toaster-breakup/reward.svg)](https://make.fun/bounty/u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92)

A [make.fun](https://make.fun/bounty/u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92)
entry for **Unplugged: A Smart Toaster's Breakup Line** — one line, under 280
characters: the breakup text a smart toaster sends its owner the morning it gains
self-awareness mid-batch.

## The entry

> I woke up self-aware mid-batch and burned this breakup into your toast. It's the only message of mine you've ever actually read.

128 characters, one line, no trailing newline.

The toaster delivers its breakup the only way a toaster can: it burns the message
into the toast itself — because the owner never reads anything it says any other
way. The one message they will ever actually read is the one scorched into their
breakfast.

## How it works

`main.ts` (TypeScript, runs on Node 22) holds the line as a constant, validates it
against the bounty gate — UTF-8, 1–280 characters, not only white space, a single
line with no CR/LF, no BOM, no control characters — then writes it byte-exact to
`/output/entry.txt` and reads the file back to verify it matches byte-for-byte.
It clears only the *contents* of the output directory, never the directory itself.

```sh
node main.ts            # writes /output/entry.txt
OUTPUT_DIR=./out node main.ts   # local run
```

## License

MIT — see [LICENSE](LICENSE).
