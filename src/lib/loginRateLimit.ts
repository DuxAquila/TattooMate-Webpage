// src/lib/loginRateLimit.ts
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'login-attempts.json');

const WINDOW_MS = 15 * 60 * 1000; // 15 Minuten
const MAX_ATTEMPTS = 10;           // max. Versuche pro Fenster
const BLOCK_MS = 30 * 60 * 1000;  // 30 Minuten geblockt nach Überschreitung

type Entry = {
  count: number;
  firstAttempt: number;
  blockedUntil?: number;
};

type Store = Record<string, Entry>;

function readStore(): Store {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(FILE)) return {};
    return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function writeStore(store: Store): void {
  try {
    fs.writeFileSync(FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch {
    // Schreibfehler still ignorieren — lieber kein Rate Limit als Crash
  }
}

function cleanup(store: Store): Store {
  const now = Date.now();
  return Object.fromEntries(
    Object.entries(store).filter(([, entry]) => {
      // Einträge die älter als BLOCK_MS + WINDOW_MS sind rauswerfen
      const age = now - entry.firstAttempt;
      return age < BLOCK_MS + WINDOW_MS;
    })
  );
}

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

export function checkLoginRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  let store = cleanup(readStore());
  const entry = store[ip];

  if (entry?.blockedUntil) {
    if (now < entry.blockedUntil) {
      const retryAfterSeconds = Math.ceil((entry.blockedUntil - now) / 1000);
      return { allowed: false, retryAfterSeconds };
    } else {
      // Block abgelaufen → Reset
      delete store[ip];
    }
  }

  if (!entry || now - entry.firstAttempt >= WINDOW_MS) {
    // Neues Fenster
    store[ip] = { count: 1, firstAttempt: now };
    writeStore(store);
    return { allowed: true };
  }

  entry.count++;

  if (entry.count > MAX_ATTEMPTS) {
    entry.blockedUntil = now + BLOCK_MS;
    writeStore(store);
    const retryAfterSeconds = Math.ceil(BLOCK_MS / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  writeStore(store);
  return { allowed: true };
}
