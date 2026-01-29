import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type Palette = {
  card: string;
  border: string;
  shadow?: string;
};

export function Card({
  children,
  colors,
  elevated = false,
  style,
}: {
  children: React.ReactNode;
  colors: Palette;
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        styles.base,
        { backgroundColor: colors.card, borderColor: colors.border },
        elevated ? styles.shadow : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  shadow: {
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
});
