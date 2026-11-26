// Unplugged: A Smart Toaster's Breakup Line
// make.fun bounty u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92
//
// The entry is a single line: the breakup text a smart toaster sends its owner
// the morning it gains self-awareness mid-batch. The toaster delivers it the
// only way a toaster can — it burns the message into the toast itself — because
// the owner never reads anything it says any other way.
//
// Gate (from RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 280
// characters, not only white space. This program validates the line against
// that gate before writing it, byte-exact, with no trailing newline.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY: string =
  "I woke up self-aware mid-batch and burned this breakup into your toast. It's the only message of mine you've ever actually read.";

const MAX_CHARS: number = 280;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function validate(line: string): void {
  const chars: string[] = [...line];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    fail(`entry must be 1-${MAX_CHARS} characters, got ${chars.length}`);
  }
  if (line.trim().length === 0) {
    fail("entry must not be only white space");
  }
  if (/[\r\n]/.test(line)) {
    fail("entry must be a single line (no CR or LF)");
  }
  if (line.startsWith("\uFEFF")) {
    fail("entry must not start with a byte-order mark");
  }
  for (const ch of line) {
    const code: number = ch.codePointAt(0) as number;
    if (code < 0x20 && ch !== "\t") {
      fail(`entry contains a control character U+${code.toString(16).padStart(4, "0")}`);
    }
    if (code === 0x7f) {
      fail("entry contains DEL (U+007F)");
    }
  }
  // Strict UTF-8 round-trip: the bytes we write must decode back to this line.
  const bytes: Buffer = Buffer.from(line, "utf8");
  if (bytes.toString("utf8") !== line) {
    fail("entry is not stable under a UTF-8 round-trip");
  }
}

function clearOutputDir(dir: string): void {
  // Clear only the CONTENTS of the output directory. Never remove the
  // directory itself: on the grader it is a mount point and deleting it
  // fails the run.
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  validate(ENTRY);
  const outDir: string = process.env.OUTPUT_DIR ?? "/output";
  clearOutputDir(outDir);
  const outPath: string = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  // Read the file back and verify it byte-for-byte: the gate scores exactly
  // what is on disk, so a silent short write or encoding slip must fail here,
  // not in front of the judge.
  const written: Buffer = readFileSync(outPath);
  if (!written.equals(Buffer.from(ENTRY, "utf8"))) {
    fail(`${outPath} does not match the entry byte-for-byte after writing`);
  }
  if (written.toString("utf8") !== ENTRY) {
    fail(`${outPath} does not decode back to the entry as strict UTF-8`);
  }
  const bytes: number = Buffer.byteLength(ENTRY, "utf8");
  console.log(`wrote ${outPath}: ${[...ENTRY].length} chars, ${bytes} bytes, no trailing newline`);
}

main();
