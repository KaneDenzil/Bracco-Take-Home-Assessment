import { CashbackInput, CashbackResult } from "../types/types";

export function roundMoney(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function calculateCashback(input: CashbackInput): CashbackResult {
  const stake = Math.max(0, input.stake);
  const wagersPerMonth = Math.max(0, Math.floor(input.wagersPerMonth));
  const rate = clamp(input.rate, 0, 1);
  const cap = Math.max(0, input.cap);

  const perWager = roundMoney(stake * rate);
  const uncappedMonthly = roundMoney(perWager * wagersPerMonth);
  const monthly = roundMoney(Math.min(uncappedMonthly, cap));
  const annual = roundMoney(monthly * 12);
  const isCapped = uncappedMonthly > cap;

  const totalWagerNeededForCap = rate > 0 ? roundMoney(cap / rate) : Infinity;

  return {
    perWager,
    monthly,
    annual,
    isCapped,
    totalWagerNeededForCap,
  };
}

export function parseMoneyInput(text: string): number {
  const cleaned = text.replace(/[^0-9.]/g, "").trim();
  if (!cleaned) return 0;

  const firstDot = cleaned.indexOf(".");
  let normalized = cleaned;
  if (firstDot !== -1) {
    normalized =
      cleaned.slice(0, firstDot + 1) +
      cleaned.slice(firstDot + 1).replace(/\./g, "");
  }
  const normalizedNumber = Number(normalized);
  if (!Number.isFinite(normalizedNumber)) return 0;
  return clamp(roundMoney(normalizedNumber), 0, 1_000_000);
}
