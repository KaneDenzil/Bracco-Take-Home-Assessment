import React from "react";
import { Pressable, Text, View } from "react-native";

export type SegmentedOption = {
  id: string;
  label: string;
  sublabel?: string;
};

export function Segmented({
  value,
  options,
  onChange,
  colors,
}: {
  value: string;
  options: SegmentedOption[];
  onChange: (id: string) => void;
  colors: {
    card: string;
    text: string;
    subtext: string;
    border: string;
    brand: string;
    brandSoft: string;
  };
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 16,
        overflow: "hidden",
      }}
      accessibilityRole="tablist"
    >
      {options.map((opt, idx) => {
        const isActive = opt.id === value;
        return (
          <Pressable
            key={opt.id}
            onPress={() => onChange(opt.id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            style={({ pressed }) => [
              {
                flex: 1,
                padding: 10,
                backgroundColor: isActive ? colors.brand : colors.card,
                opacity: pressed ? 0.9 : 1,
                borderRightWidth: idx === options.length - 1 ? 0 : 2,
                borderRightColor: colors.border,
              },
            ]}
          >
            <Text
              style={{
                fontWeight: "800",
                color: isActive ? "#FFFFFF" : colors.text,
                fontSize: 12,
              }}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {opt.label}
            </Text>
            {!!opt.sublabel && (
              <Text
                style={{ color: colors.subtext, fontSize: 12, marginTop: 3 }}
                numberOfLines={1}
              >
                {opt.sublabel}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
