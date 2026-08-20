import { existsSync, readFileSync } from "fs";
import path from "path";

const PORTFOLIO_URL = process.env.NEXT_PUBLIC_PORTFOLIO_URL;
const DEBUG_MODE = false;

export async function getPortfolio() {
  if (DEBUG_MODE) {
    const dataPath = path.join(process.cwd(), "lib", "data.json");

    if (existsSync(dataPath)) {
      return JSON.parse(readFileSync(dataPath, "utf-8"));
    }

    console.warn("Local data.json not found, falling back to remote data.");
  }

  if (!PORTFOLIO_URL) {
    throw new Error("Missing NEXT_PUBLIC_PORTFOLIO_URL");
  }

  const res = await fetch(PORTFOLIO_URL, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch portfolio data");
  }

  return res.json();
}