export function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    const sign = amount < 0 ? "-" : "";
    const fixed = Math.abs(amount).toFixed(2);
    return `${sign}${currency} ${fixed}`;
  }
}

export function formatPercent(rate: number): string {
  const percentage = rate * 100;
  return `${percentage.toFixed(percentage < 1 ? 2 : 2)}%`;
}
