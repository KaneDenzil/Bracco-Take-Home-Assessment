import React from "react";
import { Text, View } from "react-native";
import type { CashbackTier } from "../domain/cashback";
import { formatCurrency } from "../domain/format";

export function CompareBars({
  tiers,
  values,
  selectedId,
  currency,
  colors,
}: {
  tiers: CashbackTier[];
  values: Record<string, number>;
  selectedId: string;
  currency: string;
  colors: {
    text: string;
    subtext: string;
    brand: string;
    border: string;
    card: string;
    brandSoft: string;
  };
}) {
  const max = Math.max(1, ...tiers.map((t) => values[t.id] ?? 0));

  return (
    <View style={{ gap: 10 }}>
      {tiers.map((t) => {
        const v = values[t.id] ?? 0;
        const percentage = Math.min(1, v / max);
        const selected = t.id === selectedId;

        return (
          <View key={t.id} style={{ gap: 6 }}>
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
                {t.label}
              </Text>
              <Text
                style={{
                  color: selected ? colors.brand : colors.subtext,
                  fontWeight: "800",
                }}
              >
                {formatCurrency(v, currency)}
              </Text>
            </View>

            <View
              style={{
                height: 12,
                borderRadius: 999,
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
