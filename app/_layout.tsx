import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

function LottieSplash({ onFinish }: { onFinish: () => void }) {
  const ref = useRef<LottieView>(null);

  useEffect(() => {
    ref.current?.play();
  }, []);

  return (
    <View style={styles.splash}>
      <LottieView
        ref={ref}
        source={require("../assets/Lottie/splash.json")}
        autoPlay
        loop={false}
        onAnimationFinish={onFinish}
        style={styles.lottie}
      />
    </View>
  );
}

export default function RootLayout() {
  const scheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <>
        <Stack screenOptions={{ headerTitleAlign: "center" }}>
          <Stack.Screen
            name="index"
            options={{ title: "Bracco Cashback Estimator" }}
          />
        </Stack>

        {showSplash && <LottieSplash onFinish={() => setShowSplash(false)} />}
      </>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F15622",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  lottie: {
    width: 280,
    height: 280,
  },
});
