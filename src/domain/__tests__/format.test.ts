import { formatCurrency, formatPercent } from "../format";

describe("formatCurrency", () => {
  it("formats currency with 2 decimals (Intl path)", () => {
    const out = formatCurrency(1234.5, "USD");
    expect(out).toMatch(/1[, ]?234/);
    expect(out).toMatch(/50/);
  });

  it("rounds to 2 decimals (Intl path)", () => {
    const out = formatCurrency(1.239, "USD");
    expect(out).toMatch(/1\.24|1,24/);
  });

  it("uses fallback when Intl.NumberFormat throws", () => {
    const original = Intl.NumberFormat;
    Intl.NumberFormat = function () {
      throw new Error("boom");
    } as any;

    expect(formatCurrency(12.3, "USD")).toBe("USD 12.30");
    expect(formatCurrency(-12.3, "USD")).toBe("-USD 12.30");
    expect(formatCurrency(0, "USD")).toBe("USD 0.00");

    Intl.NumberFormat = original;
  });

  it("fallback rounds correctly", () => {
    const original = Intl.NumberFormat;
    Intl.NumberFormat = function () {
      throw new Error("boom");
    } as any;

    expect(formatCurrency(1.239, "USD")).toBe("USD 1.24");
    expect(formatCurrency(-1.235, "USD")).toBe("-USD 1.24");

    Intl.NumberFormat = original;
  });
});

describe("formatPercent", () => {
  it("formats as percent with two decimals", () => {
    expect(formatPercent(0.15)).toBe("15.00%");
    expect(formatPercent(0.5)).toBe("50.00%");
    expect(formatPercent(1)).toBe("100.00%");
  });

  it("formats very small rates with two decimals", () => {
    expect(formatPercent(0.001)).toBe("0.10%");
    expect(formatPercent(0.00005)).toBe("0.01%"); // rounds
  });

  it("handles zero and negative rates", () => {
    expect(formatPercent(0)).toBe("0.00%");
    expect(formatPercent(-0.1)).toBe("-10.00%");
  });
});
