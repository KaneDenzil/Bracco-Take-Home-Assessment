import { calculateCashback, parseMoneyInput } from '../cashback';

describe('calculateCashback', () => {
  it('calculates per-wager, monthly, and annual cashback (uncapped)', () => {
    const res = calculateCashback({
      stake: 10,
      wagersPerMonth: 10,
      rate: 0.005,
      cap: 1000,
    });

    expect(res.perWager).toBe(0.05);
    expect(res.monthly).toBe(0.5);
    expect(res.annual).toBe(6);
    expect(res.isCapped).toBe(false);
    expect(res.totalWagerNeededForCap).toBe(200000);
  });

  it('caps monthly cashback at the program cap', () => {
    const res = calculateCashback({
      stake: 1000,
      wagersPerMonth: 1000,
      rate: 0.04,
      cap: 1000,
    });

    expect(res.perWager).toBe(40);
    expect(res.monthly).toBe(1000);
    expect(res.annual).toBe(12000);
    expect(res.isCapped).toBe(true);
  });

  it('clamps invalid inputs to safe values', () => {
    const res = calculateCashback({
      stake: -5,
      wagersPerMonth: -3,
      rate: 2,
      cap: -100,
    });

    expect(res.perWager).toBe(0);
    expect(res.monthly).toBe(0);
    expect(res.annual).toBe(0);
    expect(res.isCapped).toBe(false);
    // rate is clamped to 1, cap becomes 0 => 0/1
    expect(res.totalWagerNeededForCap).toBe(0);
  });
});

describe('parseMoneyInput', () => {
  it('parses numbers with symbols and rounds to cents', () => {
    expect(parseMoneyInput('$1,234.567')).toBe(1234.57);
  });

  it('keeps only the first decimal point', () => {
    expect(parseMoneyInput('12.3.4')).toBe(12.34);
  });

  it('returns 0 for empty or invalid strings', () => {
    expect(parseMoneyInput('')).toBe(0);
    expect(parseMoneyInput('...')).toBe(0);
  });
});
