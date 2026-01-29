import React from 'react';
import { View, ViewStyle } from 'react-native';

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={style}>{children}</View>;
}
