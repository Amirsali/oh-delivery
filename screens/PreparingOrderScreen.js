import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
const PreparingOrderScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#cd6465] justify-center items-center ">
      <Animatable.Image
        source={require("../assets/images/preparing.gif")}
        className="h-70 w-70"
        animation="slideInUp"
        iterationCount={1}
        easing="ease-in-out"
      />
      <Text className="text-white font-extrabold bottom-20 justify-center">
        Your order is being prepared. Please wait.
      </Text>
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
