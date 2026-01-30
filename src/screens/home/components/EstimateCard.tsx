import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ThemePalette } from "@/src/types/types";
import { ProgressBar } from "../../../components/ProgressBar";
import { StatRow } from "../../../components/StatRow";
import { formatCurrency, formatPercent } from "../../../domain/format";
import { Divider, SectionTitle, SmallText } from "./ui";

type Result = {
  perWager: number;
  monthly: number;
  annual: number;
  isCapped: boolean;
  totalWagerNeededForCap: number;
};

type EstimateCard = {
  colors: ThemePalette;
  currency: string;
  cap: number;
  remaining: number;
  capLabel: string;
  selectedRate: number;
  result: Result;
};

export function EstimateCard({
  colors,
  currency,
  cap,
  remaining,
  capLabel,
  selectedRate,
  result,
}: EstimateCard) {
  const capWagerNeeded = result.totalWagerNeededForCap;

  return (
    <LinearGradient
      colors={[colors.brand, colors.card]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { borderColor: colors.border }]}
    >
      <View style={styles.headerRow}>
        <SectionTitle color={colors.text} style={styles.titleNoMargin}>
          Your estimate
        </SectionTitle>
        {result.isCapped ? (
          <View
            style={[
              styles.capPill,
              { backgroundColor: colors.text, borderColor: colors.border },
            ]}
            accessibilityLabel="Cap reached"
          >
            <Text style={[styles.capPillText, { color: colors.warning }]}>
              Cap reached
            </Text>
          </View>
        ) : null}
      </View>

      <View style={[styles.stats, { borderTopColor: colors.border }]}>
        <StatRow
          label="Cashback per wager"
          hint={`Formula: stake × rate (${formatPercent(selectedRate)})`}
          value={formatCurrency(result.perWager, currency)}
          colors={colors}
          testID="perWagerValue"
        />
        <Divider color={colors.border} />
        <StatRow
          label="Estimated monthly cashback"
          hint={`Monthly cap: ${formatCurrency(cap, currency)} • Remaining: ${formatCurrency(remaining, currency)}`}
          value={formatCurrency(result.monthly, currency)}
          colors={colors}
          testID="monthlyValue"
        />
        <Divider color={colors.border} />
        <StatRow
          label="Projected yearly cashback"
          hint="Assumes the same activity each month."
          value={formatCurrency(result.annual, currency)}
          colors={colors}
          testID="annualValue"
        />
      </View>

      <View style={styles.progress}>
        <ProgressBar
          value={result.monthly}
          max={cap}
          colors={colors}
          label={capLabel}
        />
      </View>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <SmallText color={colors.subtext}>
          Wager needed to hit cap (this month):{" "}
          <SmallText color={colors.text} style={styles.bold}>
            {Number.isFinite(capWagerNeeded)
              ? formatCurrency(capWagerNeeded, currency)
              : "—"}
          </SmallText>
        </SmallText>
        <SmallText color={colors.subtext}>
          Estimates only. Cashback is calculated on wager amount and returned to
          bonus balance.
        </SmallText>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  titleNoMargin: {
    marginBottom: 0,
  },
  capPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 25,
    borderWidth: 1,
  },
  capPillText: {
    fontWeight: "900",
    fontSize: 12,
  },
  stats: {
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 6,
  },
  progress: {
    marginTop: 14,
  },
  footer: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    rowGap: 6,
  },
  bold: {
    fontWeight: "900",
  },
});
