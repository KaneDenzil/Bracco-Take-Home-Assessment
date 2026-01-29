import React, { useMemo } from "react";
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  ViewStyle,
} from "react-native";

import { getPalette, type Palette } from "../theme/colors";

type ChipColors = Pick<Palette, "card" | "text" | "border" | "brand">;

export function Chip({
  label,
  onPress,
  colors,
  style,
}: {
  label: string;
  onPress: () => void;
  colors?: ChipColors;
  style?: StyleProp<ViewStyle>;
}) {
  const scheme = useColorScheme();
  const fallback = useMemo(() => getPalette(scheme === "dark"), [scheme]);
  const color = colors ?? fallback;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      hitSlop={8}
      android_ripple={
        Platform.OS === "android"
          ? { color: "rgba(0,0,0,0.08)", borderless: false }
          : undefined
      }
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: color.card,
          borderColor: color.border,
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <Text style={[styles.label, { color: color.text }]} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderWidth: 2,
  },
  label: {
    fontWeight: "600",
    fontSize: 13,
    textAlign: "center",
  },
});
