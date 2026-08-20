const PORTFOLIO_URL = process.env.NEXT_PUBLIC_PORTFOLIO_URL;
const DEBUG_MODE = false;

export async function getPortfolio() {
  if (DEBUG_MODE) {
    const data = await import('./data.json');
    return data.default;
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