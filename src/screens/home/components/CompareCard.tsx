import React from "react";
import { StyleSheet } from "react-native";

import { Card } from "../../../components/Card";
import { CompareBars } from "../../../components/CompareBars";

import { ThemePalette } from "../../../../src/types/types";
import type { Tier } from "../types";
import { SectionTitle } from "./ui";

type CompareCard = {
  tiers: Tier[];
  values: Record<string, number>;
  selectedId: string;
  currency: string;
  colors: ThemePalette;
};

export function CompareCard({
  tiers,
  values,
  selectedId,
  currency,
  colors,
}: CompareCard) {
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
