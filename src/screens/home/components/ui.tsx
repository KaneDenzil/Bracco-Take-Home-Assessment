import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export function SectionTitle({
  children,
  color,
  style,
}: {
  children: React.ReactNode;
  color: string;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text style={[styles.sectionTitle, { color }, style]}>{children}</Text>
  );
}

export function BodyText({
  children,
  color,
  style,
  numberOfLines,
}: {
  children: React.ReactNode;
  color: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}) {
  return (
    <Text style={[styles.body, { color }, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

export function SmallText({
  children,
  color,
  style,
  numberOfLines,
}: {
  children: React.ReactNode;
  color: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}) {
  return (
    <Text
      style={[styles.small, { color }, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

export function Divider({
  color,
  style,
}: {
  color: string;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.divider, { backgroundColor: color }, style]} />;
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: "900",
    fontSize: 16,
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    opacity: 0.8,
  },
});
