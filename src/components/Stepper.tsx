import React from "react";
import { Pressable, Text, View } from "react-native";
import { Colors } from "../types/types";

type Stopper = {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  colors: Colors;
  testID?: string;
};

export function Stepper({
  value,
  min,
  max,
  onChange,
  colors,
  testID,
}: Stopper) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <Pressable
        onPress={decrease}
        accessibilityRole="button"
        accessibilityLabel="Decrease wagers per month"
        style={({ pressed }) => ({
          paddingHorizontal: 14,
          paddingVertical: 12,
          backgroundColor: colors.card,
          opacity: pressed ? 0.85 : 1,
        })}
      >
        <Text style={{ fontWeight: "900", fontSize: 16, color: colors.text }}>
          −
        </Text>
      </Pressable>

      <View
        style={{
          paddingHorizontal: 14,
          paddingVertical: 12,
          minWidth: 64,
          alignItems: "center",
        }}
      >
        <Text
          testID={testID}
          style={{ fontWeight: "800", fontSize: 14, color: colors.text }}
        >
          {value}
        </Text>
      </View>

      <Pressable
        onPress={increase}
        accessibilityRole="button"
        accessibilityLabel="Increase wagers per month"
        style={({ pressed }) => ({
          paddingHorizontal: 14,
          paddingVertical: 12,
          backgroundColor: colors.card,
          opacity: pressed ? 0.85 : 1,
        })}
      >
        <Text style={{ fontWeight: "900", fontSize: 16, color: colors.text }}>
          +
        </Text>
      </Pressable>
    </View>
  );
}
