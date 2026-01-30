import React from "react";
import { StyleSheet, View } from "react-native";

import { Card } from "../../../components/Card";
import { Chip } from "../../../components/Chip";
import { MoneyInput } from "../../../components/MoneyInput";

import { type ThemePalette } from "../../../../src/types/types";
import { SectionTitle } from "./ui";

const GAP = 12;
const DEFAULT_WAGER_SIZES = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100];

type StakeCard = {
  currency: string;
  value: string;
  onChangeText: (text: string) => void;
  onSelectPreset: (n: number) => void;
  colors: ThemePalette;
  wagerSizes?: number[];
};

export function StakeCard({
  currency,
  value,
  onChangeText,
  onSelectPreset,
  colors,
  wagerSizes = DEFAULT_WAGER_SIZES,
}: StakeCard) {
  return (
    <Card colors={colors} style={styles.card}>
      <SectionTitle color={colors.text}>Wager size</SectionTitle>

      <MoneyInput
        value={value}
        onChangeText={onChangeText}
        currency={currency}
        colors={colors}
        testID="stakeInput"
      />

      <View style={styles.presets}>
        <View style={[styles.grid, { marginHorizontal: -GAP / 2 }]}>
          {wagerSizes.map((n) => (
            <View
              key={n}
              style={[
                styles.gridItem,
                { paddingHorizontal: GAP / 2, marginBottom: GAP },
              ]}
            >
              <Chip
                label={`${currency} ${n}`}
                onPress={() => onSelectPreset(n)}
                colors={colors}
                style={{ width: "100%" }}
              />
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
  },
  presets: {
    marginTop: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    width: "33.3333%",
  },
});
