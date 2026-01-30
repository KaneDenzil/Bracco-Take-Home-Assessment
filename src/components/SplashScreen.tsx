import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";

export function LottieSplash({ onFinish }: { onFinish: () => void }) {
  const ref = useRef<LottieView>(null);

  useEffect(() => {
    ref.current?.play();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        ref={ref}
        source={require("../../assets/lottie/splash.json")}
        autoPlay
        loop={false}
        onAnimationFinish={onFinish}
        style={styles.lottie}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F15622",
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
});
