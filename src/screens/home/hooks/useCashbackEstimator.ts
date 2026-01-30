import { useMemo, useState } from "react";

import { calculateCashback, parseMoneyInput } from "../../../domain/cashback";
import { formatCurrency } from "../../../domain/format";

import type { Program, Tier } from "../types";

export function useCashbackEstimator(program: Program) {
  const tiers = program.tiers as Tier[];

  const [tierId, setTierId] = useState<string>(tiers[0]?.id ?? "straight");
  const [stakeText, setStakeText] = useState<string>("5");
  const [wagersPerMonth, setWagersPerMonth] = useState<number>(10);
  const [showHow, setShowHow] = useState<boolean>(false);

  const selectedTier = useMemo(
    () => tiers.find((t) => t.id === tierId) ?? tiers[0],
    [tiers, tierId],
  );

  const stake = useMemo(() => parseMoneyInput(stakeText), [stakeText]);

  const result = useMemo(() => {
    return calculateCashback({
      stake,
      wagersPerMonth,
      rate: selectedTier?.rate ?? 0,
      cap: program.max_monthly_cashback_cap,
    });
  }, [program.max_monthly_cashback_cap, selectedTier, stake, wagersPerMonth]);

  const monthlyByTier = useMemo(() => {
    const out: Record<string, number> = {};
    for (const t of tiers) {
      out[t.id] = calculateCashback({
        stake,
        wagersPerMonth,
        rate: t.rate,
        cap: program.max_monthly_cashback_cap,
      }).monthly;
    }
    return out;
  }, [program.max_monthly_cashback_cap, stake, wagersPerMonth, tiers]);

  const remaining = Math.max(
    0,
    program.max_monthly_cashback_cap - result.monthly,
  );
  const totalWagerThisMonth = stake * wagersPerMonth;
  const capWagerNeeded = result.totalWagerNeededForCap;

  const capLabel = `${formatCurrency(result.monthly, program.currency)} of ${formatCurrency(
    program.max_monthly_cashback_cap,
    program.currency,
  )} cap`;

  return {
    tiers,
    tierId,
    setTierId,
    stakeText,
    setStakeText,
    wagersPerMonth,
    setWagersPerMonth,
    showHow,
    setShowHow,

    selectedTier,
    stake,

    result,
    monthlyByTier,
    remaining,
    totalWagerThisMonth,
    capWagerNeeded,
    capLabel,
  };
}
