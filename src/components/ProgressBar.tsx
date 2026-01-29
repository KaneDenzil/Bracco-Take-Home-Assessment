import React from "react";
import { Text, View } from "react-native";

export function ProgressBar({
  value,
  max,
  colors,
  label,
}: {
  value: number;
  max: number;
  label: string;
  colors: {
    border: string;
    brand: string;
    subtext: string;
    card: string;
  };
}) {
  const percentage = max <= 0 ? 0 : Math.min(1, Math.max(0, value / max));
  return (
    <View>
      <View
        style={{
          height: 12,
          borderRadius: 999,
          borderWidth: 2,
          borderColor: colors.border,
          backgroundColor: colors.card,
          overflow: "hidden",
        }}
        accessibilityRole="progressbar"
        accessibilityValue={{
          min: 0,
          max: Math.round(max * 100),
          now: Math.round(value * 100),
          text: label,
        }}
      >
        <View
          style={{
            width: `${percentage * 100}%`,
            height: "100%",
            backgroundColor: colors.brand,
          }}
        />
      </View>
      <Text style={{ marginTop: 8, color: colors.subtext, fontSize: 12 }}>
        {label}
      </Text>
    </View>
  );
}
