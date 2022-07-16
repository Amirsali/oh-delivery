import { SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 3500);
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-[#cd6465] justify-center items-center ">
      <Animatable.Image
        source={require("../assets/images/preparing.gif")}
        className="h-70 w-70"
        animation="slideInUp"
        iterationCount={1}
        easing="ease-in-out"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-white font-extrabold bottom-20 justify-center"
      >
        Your order is being prepared. Please wait.
      </Animatable.Text>

      <Progress.Bar
        animationType="spring"
        size={60}
        indeterminate={true}
        color="white"
      />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
