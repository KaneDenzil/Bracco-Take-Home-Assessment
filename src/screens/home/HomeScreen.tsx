import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import program from "../../data/program.json";
import { getTheme } from "../../theme/colors";
import { space } from "../../theme/spacing";

import { BetTypeCard } from "./components/BetTypeCard";
import { CompareCard } from "./components/CompareCard";
import { EstimateCard } from "./components/EstimateCard";
import { HeaderBlock } from "./components/HeaderBlock";
import { HowItWorksCard } from "./components/HowItWorksCard";
import { MonthlyActivityCard } from "./components/MonthlyActivityCard";
import { StakeCard } from "./components/StakeCard";
import { useCashbackEstimator } from "./hooks/useCashbackEstimator";
import { useFeedback } from "./hooks/useFeedback";

export default function HomeScreen() {
  const isDark = useColorScheme() === "dark";
  const colors = getTheme(isDark);

  const {
    tiers,
    tierId,
    setTierId,
    stakeText,
    setStakeText,
    wagersPerMonth,
    setWagersPerMonth,
    showHow,
    setShowHow,
    selectedTier,
    result,
    monthlyByTier,
    remaining,
    totalWagerThisMonth,
    capWagerNeeded,
    capLabel,
  } = useCashbackEstimator(program);

  const { select, lightImpact, animate } = useFeedback();

  const onTierChange = (id: string) => select(() => setTierId(id));
  const onStakeChange = (text: string) => animate(() => setStakeText(text));
  const onStakePreset = (n: number) => select(() => setStakeText(String(n)));
  const onWagersChange = (value: number) =>
    select(() => setWagersPerMonth(value));
  const onToggleHow = () => lightImpact(() => setShowHow((s) => !s));

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView
        contentContainerStyle={[styles.content, { padding: space.xl }]}
      >
        <HeaderBlock programName={program.program_name} colors={colors} />

        <BetTypeCard
          program={program}
          tiers={tiers}
          value={tierId}
          onChange={onTierChange}
          selectedTier={selectedTier}
          colors={colors}
          elevated={!isDark}
        />

        <StakeCard
          currency={program.currency}
          value={stakeText}
          onChangeText={onStakeChange}
          onSelectPreset={onStakePreset}
          colors={colors}
        />

        <MonthlyActivityCard
          value={wagersPerMonth}
          onChange={onWagersChange}
          totalWagerThisMonth={totalWagerThisMonth}
          currency={program.currency}
          colors={colors}
        />

        <EstimateCard
          colors={colors}
          currency={program.currency}
          cap={program.max_monthly_cashback_cap}
          remaining={remaining}
          capLabel={capLabel}
          selectedRate={selectedTier.rate}
          result={{
            perWager: result.perWager,
            monthly: result.monthly,
            annual: result.annual,
            isCapped: result.isCapped,
            totalWagerNeededForCap: capWagerNeeded,
          }}
        />

        <CompareCard
          tiers={tiers}
          values={monthlyByTier}
          selectedId={tierId}
          currency={program.currency}
          colors={colors}
        />

        <HowItWorksCard
          open={showHow}
          onToggle={onToggleHow}
          colors={colors}
          cap={program.max_monthly_cashback_cap}
          currency={program.currency}
        />

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  bottomSpace: {
    height: 22,
  },
});
