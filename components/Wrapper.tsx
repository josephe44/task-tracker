import React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface WrapperProps {
  children: React.ReactNode;
  bg?: string;
  paddingHorizontal?: number;
}

const Wrapper = ({ children, bg, paddingHorizontal }: WrapperProps) => {
  const { top } = useSafeAreaInsets();
  const value = Platform.OS === "ios" ? 10 : 20;
  const paddingTop = top > 0 ? top + value : 30;
  return (
    <View
      style={{
        flex: 1,
        paddingTop,
        backgroundColor: bg,
        paddingHorizontal: paddingHorizontal,
        zIndex: 2,
      }}
    >
      <View style={{ zIndex: 1, flex: 1 }}>{children}</View>
    </View>
  );
};

export default Wrapper;
