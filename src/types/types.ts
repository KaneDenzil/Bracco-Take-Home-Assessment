export type Colors = {
  text: string;
  subtext: string;
  brand: string;
  border: string;
  card: string;
  brandSoft: string;
};

export type CashbackTier = {
  id: string;
  label: string;
  rate: number;
};

export type CashbackProgram = {
  program_name: string;
  currency: string;
  max_monthly_cashback_cap: number;
  period: "monthly";
  tiers: CashbackTier[];
};

export type CashbackInput = {
  stake: number;
  wagersPerMonth: number;
  rate: number;
  cap: number;
};

export type CashbackResult = {
  perWager: number;
  monthly: number;
  annual: number;
  isCapped: boolean;
  totalWagerNeededForCap: number;
};

export type ThemePalette = {
  bg: string;
  card: string;
  text: string;
  subtext: string;
  border: string;
  brand: string;
  brandSoft: string;
  positive: string;
  warning: string;
  shadow: string;
};
