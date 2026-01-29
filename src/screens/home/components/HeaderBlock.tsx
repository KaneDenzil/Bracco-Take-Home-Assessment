import React from "react";
import { StyleSheet, Text, View } from "react-native";

import type { Palette } from "../../../theme/colors";
import { BodyText } from "./ui";

export function HeaderBlock({
  programName,
  colors,
}: {
  programName: string;
  colors: Palette;
}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.programName, { color: colors.subtext }]}>
        {programName}
      </Text>
      <Text style={[styles.title, { color: colors.text }]}>
        Cashback estimator
      </Text>
      <BodyText color={colors.subtext}>
        Estimate how much cashback you&apos;ll earn based on your wager size and
        bet type. (Front-end only — uses the provided JSON.)
      </BodyText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 14,
    marginBottom: 18,
  },
  programName: {
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  title: {
    fontWeight: "900",
    fontSize: 28,
    lineHeight: 32,
  },
});
