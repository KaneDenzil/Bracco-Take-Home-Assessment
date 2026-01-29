import React from "react";
import { StyleSheet, View } from "react-native";

import { Card } from "../../../components/Card";
import { Segmented } from "../../../components/Segmented";
import { formatCurrency, formatPercent } from "../../../domain/format";
import type { Palette } from "../../../theme/colors";

import type { Program, Tier } from "../types";
import { SectionTitle, SmallText } from "./ui";

export function BetTypeCard({
  program,
  tiers,
  value,
  onChange,
  selectedTier,
  colors,
  elevated,
}: {
  program: Program;
  tiers: Tier[];
  value: string;
  onChange: (id: string) => void;
  selectedTier: Tier;
  colors: Palette;
  elevated: boolean;
}) {
  return (
    <Card colors={colors} elevated={elevated} style={styles.card}>
      <SectionTitle color={colors.text}>Bet type</SectionTitle>

      <Segmented
        value={value}
        onChange={onChange}
        colors={colors}
        options={tiers.map((t) => ({
          id: t.id,
          label: t.label.replace(" Bet", ""),
          sublabel: formatPercent(t.rate),
        }))}
      />

      <View style={[styles.meta, { borderTopColor: colors.border }]}>
        <SmallText color={colors.subtext}>
          Selected rate:{" "}
          <SmallText color={colors.brand} style={styles.bold}>
            {formatPercent(selectedTier.rate)}
          </SmallText>
        </SmallText>

        <SmallText color={colors.subtext}>
          Max monthly cashback:{" "}
          <SmallText color={colors.text} style={styles.bold}>
            {formatCurrency(program.max_monthly_cashback_cap, program.currency)}
          </SmallText>
        </SmallText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
  },
  meta: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    rowGap: 6,
  },
  bold: {
    fontWeight: "900",
  },
});
