import React from 'react';
import { View, Text } from 'react-native';

export function StatRow({
  label,
  value,
  hint,
  colors,
  testID,
}: {
  label: string;
  value: string;
  hint?: string;
  colors: { text: string; subtext: string; brand: string };
  testID?: string;
}) {
  return (
    <View style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <View style={{ flex: 1, paddingRight: 12 }}>
        <Text style={{ color: colors.subtext, fontWeight: '700', fontSize: 12 }}>{label}</Text>
        {!!hint && <Text style={{ color: colors.subtext, fontSize: 12, marginTop: 4 }}>{hint}</Text>}
      </View>
      <Text testID={testID} style={{ color: colors.text, fontWeight: '900', fontSize: 18 }}>
        {value}
      </Text>
    </View>
  );
}
