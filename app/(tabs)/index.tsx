import CustomHeader from "@/components/CustomHeader";
import Wrapper from "@/components/Wrapper";
import React from "react";
import { StyleSheet } from "react-native";

const Home = () => {
  return (
    <Wrapper paddingHorizontal={20}>
      <CustomHeader title="Home" showBack={false} />
    </Wrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
