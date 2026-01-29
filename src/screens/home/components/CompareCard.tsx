import React from "react";
import { StyleSheet } from "react-native";

import { Card } from "../../../components/Card";
import { CompareBars } from "../../../components/CompareBars";
import type { Palette } from "../../../theme/colors";

import type { Tier } from "../types";
import { SectionTitle } from "./ui";

export function CompareCard({
  tiers,
  values,
  selectedId,
  currency,
  colors,
}: {
  tiers: Tier[];
  values: Record<string, number>;
  selectedId: string;
  currency: string;
  colors: Palette;
}) {
  return (
    <Card colors={colors} style={styles.card}>
      <SectionTitle color={colors.text}>
        Compare bet types (same stake & activity)
      </SectionTitle>
      <CompareBars
        tiers={tiers}
        values={values}
        selectedId={selectedId}
        currency={currency}
        colors={colors}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
  },
});
