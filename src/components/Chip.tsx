import React from "react";
import { Pressable, Text, useColorScheme, ViewStyle } from "react-native";
import { getPalette } from "../theme/colors";

export function Chip({
  label,
  onPress,
  style,
}: {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}) {
  const isDark = useColorScheme() === "dark";
  const colors = getPalette(isDark);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        {
          padding: 8,
          alignItems: "center",
          borderRadius: 25,
          borderWidth: 2,
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <Text style={{ color: colors.text, fontWeight: "600" }}>{label}</Text>
    </Pressable>
  );
}
