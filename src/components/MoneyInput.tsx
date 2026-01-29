import React from "react";
import { Text, TextInput, View } from "react-native";

export function MoneyInput({
  value,
  onChangeText,
  currency,
  colors,
  testID,
}: {
  value: string;
  onChangeText: (text: string) => void;
  currency: string;
  colors: {
    card: string;
    text: string;
    subtext: string;
    border: string;
    brand: string;
  };
  testID?: string;
}) {
  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: colors.card,
      }}
    >
      <Text style={{ color: colors.subtext, fontWeight: "800" }}>
        {currency}
      </Text>
      <TextInput
        testID={testID}
        value={value}
        onChangeText={onChangeText}
        keyboardType="decimal-pad"
        placeholder="0.00"
        placeholderTextColor={colors.subtext}
        style={{ flex: 1, color: colors.text, fontSize: 18, fontWeight: "900" }}
        returnKeyType="done"
        accessibilityLabel="Stake per wager"
      />
      <Text style={{ color: colors.subtext, fontWeight: "700" }}>/ wager</Text>
    </View>
  );
}
