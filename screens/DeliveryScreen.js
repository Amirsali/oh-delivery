import { View, Text, SafeAreaView, Image, Linking } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import { XIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="flex-1 bg-[#cd6465]">
      <SafeAreaView className="z-50 top-10">
        <View className="flex-row justify-between items-center p-5">
          <Text className="font-light text-white text-lg">Order Help</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XIcon color={"#fff"} size={30} />
          </TouchableOpacity>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold top-2">30 -35 Minutes</Text>
            </View>
            <Image
              source={require("../assets/images/rider.gif")}
              className="h-20 w-20 top-1"
            />
          </View>
          <Progress.Bar
            size={30}
            indeterminate={true}
            // change color
            color={"#cd6465"}
          />
          <Text className="mt-3 text-gray-500">
            Your order is on the way. Almost there!
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          // zoom scale
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#cd6465"
        />
      </MapView>

      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-20">
        <Image
          source={require("../assets/images/logo.png")}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Amir Muhalli</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://portf-amir23.web.app")}
        >
          <Text className="text-[#F86874] text-lg mr-5 font-bold">Call</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
