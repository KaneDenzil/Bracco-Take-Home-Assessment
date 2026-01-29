import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  UIManager,
  useColorScheme,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Chip } from "../src/components/Chip";
import { CompareBars } from "../src/components/CompareBars";
import { MoneyInput } from "../src/components/MoneyInput";
import { ProgressBar } from "../src/components/ProgressBar";
import { Segmented } from "../src/components/Segmented";
import { StatRow } from "../src/components/StatRow";
import { Stepper } from "../src/components/Stepper";
import program from "../src/data/program.json";
import { calculateCashback, parseMoneyInput } from "../src/domain/cashback";
import { formatCurrency, formatPercent } from "../src/domain/format";
import { getPalette } from "../src/theme/colors";
import { space } from "../src/theme/spacing";

type Tier = (typeof program.tiers)[number];

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function animateNext() {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}

export default function App() {
  const isDark = useColorScheme() === "dark";
  const colors = getPalette(isDark);

  const tiers = program.tiers as Tier[];

  const [tierId, setTierId] = useState<string>(tiers[0]?.id ?? "straight");
  const [stakeText, setStakeText] = useState<string>("10");
  const [wagersPerMonth, setWagersPerMonth] = useState<number>(10);
  const [showHow, setShowHow] = useState<boolean>(false);

  const selectedTier = useMemo(
    () => tiers.find((t) => t.id === tierId) ?? tiers[0],
    [tiers, tierId],
  );
  const stake = useMemo(() => parseMoneyInput(stakeText), [stakeText]);

  const result = useMemo(() => {
    return calculateCashback({
      stake,
      wagersPerMonth,
      rate: selectedTier?.rate ?? 0,
      cap: program.max_monthly_cashback_cap,
    });
  }, [stake, wagersPerMonth, selectedTier]);

  const monthlyByTier = useMemo(() => {
    const out: Record<string, number> = {};
    for (const t of tiers) {
      out[t.id] = calculateCashback({
        stake,
        wagersPerMonth,
        rate: t.rate,
        cap: program.max_monthly_cashback_cap,
      }).monthly;
    }
    return out;
  }, [stake, wagersPerMonth, tiers]);

  const capLabel = `${formatCurrency(result.monthly, program.currency)} of ${formatCurrency(program.max_monthly_cashback_cap, program.currency)} cap`;
  const remaining = Math.max(
    0,
    program.max_monthly_cashback_cap - result.monthly,
  );

  const totalWagerThisMonth = stake * wagersPerMonth;
  const capWagerNeeded = result.totalWagerNeededForCap;

  const wagerSize = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100];

  const onTierChange = (id: string) => {
    animateNext();
    setTierId(id);
    Haptics.selectionAsync().catch(() => {});
  };

  const onToggleHow = () => {
    animateNext();
    setShowHow((s) => !s);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.bg }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <ScrollView
        contentContainerStyle={{ padding: space.xl, paddingBottom: 40 }}
      >
        <View style={{ gap: 14, marginBottom: 18 }}>
          <Text
            style={{
              color: colors.subtext,
              fontWeight: "800",
              letterSpacing: 0.2,
            }}
          >
            {program.program_name}
          </Text>
          <Text
            style={{
              color: colors.text,
              fontWeight: "900",
              fontSize: 28,
              lineHeight: 32,
            }}
          >
            Cashback estimator
          </Text>
          <Text style={{ color: colors.subtext, fontSize: 14, lineHeight: 20 }}>
            Estimate how much cashback you&apos;ll earn based on your wager size
            and bet type. (Front-end only — uses the provided JSON.)
          </Text>
        </View>

        {/* Bet type */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 20,
            padding: space.lg,
            borderWidth: 1,
            borderColor: colors.border,
            shadowColor: colors.shadow,
            shadowOpacity: isDark ? 0 : 1,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontWeight: "900",
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Bet type
          </Text>
          <Segmented
            value={tierId}
            onChange={onTierChange}
            colors={colors}
            options={tiers.map((t) => ({
              id: t.id,
              label: t.label.replace(" Bet", ""),
              sublabel: formatPercent(t.rate),
            }))}
          />
          <View
            style={{
              marginTop: 10,
              paddingTop: 10,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              gap: 6,
            }}
          >
            <Text style={{ color: colors.subtext, fontSize: 12 }}>
              Selected rate:{" "}
              <Text style={{ color: colors.brand, fontWeight: "900" }}>
                {formatPercent(selectedTier?.rate ?? 0)}
              </Text>
            </Text>
            <Text style={{ color: colors.subtext, fontSize: 12 }}>
              Max monthly cashback:{" "}
              <Text style={{ color: colors.text, fontWeight: "900" }}>
                {formatCurrency(
                  program.max_monthly_cashback_cap,
                  program.currency,
                )}
              </Text>
            </Text>
          </View>
        </View>

        {/* Stake */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 20,
            padding: space.lg,
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontWeight: "900",
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Wager size
          </Text>
          <MoneyInput
            value={stakeText}
            onChangeText={(t) => {
              animateNext();
              setStakeText(t);
            }}
            currency={program.currency}
            colors={colors}
            testID="stakeInput"
          />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginHorizontal: -12 / 2,
              }}
            >
              {wagerSize.map((n) => (
                <View
                  key={n}
                  style={{
                    width: "33.3333%",
                    paddingHorizontal: 12 / 2,
                    marginBottom: 12,
                  }}
                >
                  <Chip
                    label={`${program.currency} ${n}`}
                    onPress={() => {
                      animateNext();
                      setStakeText(String(n));
                      Haptics.selectionAsync().catch(() => {});
                    }}
                    style={{
                      width: "100%",
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 20,
            padding: space.lg,
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 14,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{ color: colors.text, fontWeight: "900", fontSize: 16 }}
              >
                Monthly activity
              </Text>
              <Text
                style={{ color: colors.subtext, marginTop: 6, fontSize: 12 }}
              >
                How many wagers of this type you place in a month.
              </Text>
            </View>
            <Stepper
              value={wagersPerMonth}
              min={0}
              max={500}
              onChange={(v) => {
                animateNext();
                setWagersPerMonth(v);
                Haptics.selectionAsync().catch(() => {});
              }}
              colors={colors}
              testID="wagersPerMonthValue"
            />
          </View>
          <View style={{ marginTop: 12 }}>
            <Text style={{ color: colors.subtext, fontSize: 12 }}>
              Total wagered (month):{" "}
              <Text style={{ color: colors.text, fontWeight: "900" }}>
                {formatCurrency(totalWagerThisMonth, program.currency)}
              </Text>
            </Text>
          </View>
        </View>
        <LinearGradient
          colors={
            isDark ? [colors.brand, colors.card] : [colors.brand, colors.card]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 22,
            padding: space.lg,
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 14,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <Text
              style={{ color: colors.text, fontWeight: "900", fontSize: 16 }}
            >
              Your estimate
            </Text>
            {result.isCapped ? (
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 999,
                  backgroundColor: colors.text,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
                accessibilityLabel="Cap reached"
              >
                <Text
                  style={{
                    color: colors.warning,
                    fontWeight: "900",
                    fontSize: 12,
                  }}
                >
                  Cap reached
                </Text>
              </View>
            ) : null}
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: colors.border,
              marginTop: 10,
              paddingTop: 6,
            }}
          >
            <StatRow
              label="Cashback per wager"
              hint={`Formula: stake × rate (${formatPercent(selectedTier?.rate ?? 0)})`}
              value={formatCurrency(result.perWager, program.currency)}
              colors={colors}
              testID="perWagerValue"
            />
            <View
              style={{
                height: 1,
                backgroundColor: colors.border,
                opacity: 0.8,
              }}
            />
            <StatRow
              label="Estimated monthly cashback"
              hint={`Monthly cap: ${formatCurrency(program.max_monthly_cashback_cap, program.currency)} • Remaining: ${formatCurrency(remaining, program.currency)}`}
              value={formatCurrency(result.monthly, program.currency)}
              colors={colors}
              testID="monthlyValue"
            />
            <View
              style={{
                height: 1,
                backgroundColor: colors.border,
                opacity: 0.8,
              }}
            />
            <StatRow
              label="Projected yearly cashback"
              hint="Assumes the same activity each month."
              value={formatCurrency(result.annual, program.currency)}
              colors={colors}
              testID="annualValue"
            />
          </View>

          <View style={{ marginTop: 14 }}>
            <ProgressBar
              value={result.monthly}
              max={program.max_monthly_cashback_cap}
              colors={colors}
              label={capLabel}
            />
          </View>

          <View
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              gap: 6,
            }}
          >
            <Text style={{ color: colors.subtext, fontSize: 12 }}>
              Wager needed to hit cap (this month):{" "}
              <Text style={{ color: colors.text, fontWeight: "900" }}>
                {Number.isFinite(capWagerNeeded)
                  ? formatCurrency(capWagerNeeded, program.currency)
                  : "—"}
              </Text>
            </Text>
            <Text style={{ color: colors.subtext, fontSize: 12 }}>
              Estimates only. Cashback is calculated on wager amount and
              returned to bonus balance.
            </Text>
          </View>
        </LinearGradient>

        {/* Compare */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 20,
            padding: space.lg,
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontWeight: "900",
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Compare bet types (same stake & activity)
          </Text>
          <CompareBars
            tiers={tiers}
            values={monthlyByTier}
            selectedId={tierId}
            currency={program.currency}
            colors={colors}
          />
        </View>

        {/* How it works */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 20,
            padding: space.lg,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Pressable
            onPress={onToggleHow}
            accessibilityRole="button"
            accessibilityLabel="Toggle how it works"
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: colors.text, fontWeight: "900", fontSize: 16 }}
              >
                How it works
              </Text>
              <Text style={{ color: colors.brand, fontWeight: "900" }}>
                {showHow ? "Hide" : "Show"}
              </Text>
            </View>
            <Text style={{ color: colors.subtext, fontSize: 12, marginTop: 6 }}>
              Transparent math, plus cap behavior.
            </Text>
          </Pressable>

          {showHow ? (
            <View style={{ marginTop: 12, gap: 10 }}>
              <Text style={{ color: colors.text, lineHeight: 20 }}>
                1) Cashback per wager ={" "}
                <Text style={{ fontWeight: "900" }}>stake × rate</Text>
              </Text>
              <Text style={{ color: colors.text, lineHeight: 20 }}>
                2) Monthly cashback ={" "}
                <Text style={{ fontWeight: "900" }}>
                  perWager × wagersPerMonth
                </Text>{" "}
                (capped at{" "}
                <Text style={{ fontWeight: "900" }}>
                  {formatCurrency(
                    program.max_monthly_cashback_cap,
                    program.currency,
                  )}
                </Text>
                )
              </Text>
              <Text style={{ color: colors.text, lineHeight: 20 }}>
                3) Wager needed to hit cap ={" "}
                <Text style={{ fontWeight: "900" }}>cap ÷ rate</Text>
              </Text>
              <Text
                style={{ color: colors.subtext, lineHeight: 20, fontSize: 12 }}
              >
                This UI is intentionally front-end only (no backend). Rates and
                cap come from the JSON provided in the prompt.
              </Text>
            </View>
          ) : null}
        </View>

        <View style={{ height: 22 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
