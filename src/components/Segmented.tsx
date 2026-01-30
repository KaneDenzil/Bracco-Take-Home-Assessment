import React from "react";
import { Pressable, Text, View } from "react-native";
import { Colors } from "../types/types";

export type SegmentedOption = {
  id: string;
  label: string;
  sublabel?: string;
};

type Segmented = {
  value: string;
  options: SegmentedOption[];
  onChange: (id: string) => void;
  colors: Colors;
};

export function Segmented({ value, options, onChange, colors }: Segmented) {
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
      {options.map((option, index) => {
        const isActive = option.id === value;
        return (
          <Pressable
            key={option.id}
            onPress={() => onChange(option.id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            style={({ pressed }) => [
              {
                flex: 1,
                padding: 10,
                backgroundColor: isActive ? colors.brand : colors.card,
                opacity: pressed ? 0.9 : 1,
                borderRightWidth: index === options.length - 1 ? 0 : 2,
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
              {option.label}
            </Text>
            {!!option.sublabel && (
              <Text
                style={{ color: colors.subtext, fontSize: 12, marginTop: 3 }}
                numberOfLines={1}
              >
                {option.sublabel}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
