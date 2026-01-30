import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Card } from "../../../components/Card";
import { formatCurrency } from "../../../domain/format";

import { ThemePalette } from "../../../../src/types/types";
import { BodyText, SectionTitle, SmallText } from "./ui";

type Colors = ThemePalette;

type HowItWorksCard = {
  open: boolean;
  onToggle: () => void;
  colors: Colors;
  cap: number;
  currency: string;
};

export function HowItWorksCard({
  open,
  onToggle,
  colors,
  cap,
  currency,
}: HowItWorksCard) {
  return (
    <Card colors={colors}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityLabel="Toggle how it works"
      >
        <View style={styles.row}>
          <SectionTitle color={colors.text} style={styles.titleNoMargin}>
            How it works
          </SectionTitle>
          <SmallText color={colors.brand} style={styles.bold}>
            {open ? "Hide" : "Show"}
          </SmallText>
        </View>

        <SmallText color={colors.subtext} style={styles.subCopy}>
          Transparent math, plus cap behavior.
        </SmallText>
      </Pressable>

      {open ? (
        <View style={styles.body}>
          <BodyText color={colors.text}>
            1) Cashback per wager ={" "}
            <BodyText color={colors.text} style={styles.bold}>
              stake × rate
            </BodyText>
          </BodyText>
          <BodyText color={colors.text}>
            2) Monthly cashback ={" "}
            <BodyText color={colors.text} style={styles.bold}>
              perWager × wagersPerMonth
            </BodyText>{" "}
            (capped at{" "}
            <BodyText color={colors.text} style={styles.bold}>
              {formatCurrency(cap, currency)}
            </BodyText>
            )
          </BodyText>
          <BodyText color={colors.text}>
            3) Wager needed to hit cap ={" "}
            <BodyText color={colors.text} style={styles.bold}>
              cap ÷ rate
            </BodyText>
          </BodyText>
          <SmallText color={colors.subtext}>
            This UI is intentionally front-end only (no backend). Rates and cap
            come from the JSON provided in the prompt.
          </SmallText>
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleNoMargin: {
    marginBottom: 0,
  },
  subCopy: {
    marginTop: 6,
  },
  body: {
    marginTop: 12,
    rowGap: 10,
  },
  bold: {
    fontWeight: "900",
  },
});
