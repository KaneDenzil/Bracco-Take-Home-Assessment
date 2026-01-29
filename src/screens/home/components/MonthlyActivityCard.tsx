import React from "react";
import { StyleSheet, View } from "react-native";

import { Card } from "../../../components/Card";
import { Stepper } from "../../../components/Stepper";
import { formatCurrency } from "../../../domain/format";
import type { Palette } from "../../../theme/colors";

import { SectionTitle, SmallText } from "./ui";

export function MonthlyActivityCard({
  value,
  onChange,
  totalWagerThisMonth,
  currency,
  colors,
}: {
  value: number;
  onChange: (v: number) => void;
  totalWagerThisMonth: number;
  currency: string;
  colors: Palette;
}) {
  return (
    <Card colors={colors} style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <SectionTitle color={colors.text} style={styles.titleNoMargin}>
            Monthly activity
          </SectionTitle>
          <SmallText color={colors.subtext} style={styles.subCopy}>
            How many wagers of this type you place in a month.
          </SmallText>
        </View>
        <Stepper
          value={value}
          min={0}
          max={500}
          onChange={onChange}
          colors={colors}
          testID="wagersPerMonthValue"
        />
      </View>

      <View style={styles.footer}>
        <SmallText color={colors.subtext}>
          Total wagered (month):{" "}
          <SmallText color={colors.text} style={styles.bold}>
            {formatCurrency(totalWagerThisMonth, currency)}
          </SmallText>
        </SmallText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 12,
  },
  headerText: {
    flex: 1,
  },
  titleNoMargin: {
    marginBottom: 0,
  },
  subCopy: {
    marginTop: 6,
  },
  footer: {
    marginTop: 12,
  },
  bold: {
    fontWeight: "900",
  },
});
