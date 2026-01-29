import * as Haptics from "expo-haptics";
import { useCallback } from "react";
import { LayoutAnimation, Platform, UIManager } from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function animateNext() {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}

export function useFeedback() {
  const select = useCallback((fn: () => void) => {
    animateNext();
    fn();
    Haptics.selectionAsync().catch(() => {});
  }, []);

  const lightImpact = useCallback((fn: () => void) => {
    animateNext();
    fn();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }, []);

  const animate = useCallback((fn: () => void) => {
    animateNext();
    fn();
  }, []);

  return { select, lightImpact, animate };
}
