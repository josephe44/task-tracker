import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Fragment, useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [loaded] = useFonts({
    BricolageGrotesqueRegular: require("../assets/fonts/BricolageGrotesque-Regular.ttf"),
    BricolageGrotesqueMedium: require("../assets/fonts/BricolageGrotesque-Medium.ttf"),
    BricolageGrotesqueSemiBold: require("../assets/fonts/BricolageGrotesque-SemiBold.ttf"),
    BricolageGrotesqueBold: require("../assets/fonts/BricolageGrotesque-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    // Wait for fonts to load
    return null;
  }

  return (
    <Fragment>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </Fragment>
  );
}
