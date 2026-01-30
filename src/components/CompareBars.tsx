import React from "react";
import { Text, View } from "react-native";
import { formatCurrency } from "../domain/format";
import { type CashbackTier, type Colors } from "../types/types";

type CompareBars = {
  tiers: CashbackTier[];
  values: Record<string, number>;
  selectedId: string;
  currency: string;
  colors: Colors;
};

export function CompareBars({
  tiers,
  values,
  selectedId,
  currency,
  colors,
}: CompareBars) {
  const max = Math.max(1, ...tiers.map((tier) => values[tier.id] ?? 0));

  return (
    <View style={{ gap: 10 }}>
      {tiers.map((tier) => {
        const value = values[tier.id] ?? 0;
        const percentage = Math.min(1, value / max);
        const selected = tier.id === selectedId;

        return (
          <View key={tier.id} style={{ gap: 6 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontWeight: selected ? "900" : "700",
                }}
              >
                {tier.label}
              </Text>
              <Text
                style={{
                  color: selected ? colors.brand : colors.subtext,
                  fontWeight: "800",
                }}
              >
                {formatCurrency(value, currency)}
              </Text>
            </View>

            <View
              style={{
                height: 12,
                borderRadius: 25,
                borderWidth: 2,
                borderColor: colors.border,
                backgroundColor: selected ? colors.brandSoft : colors.card,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  width: `${percentage * 100}%`,
                  height: "100%",
                  backgroundColor: selected ? colors.brand : colors.border,
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}
