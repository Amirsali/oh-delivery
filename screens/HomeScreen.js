import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/logo.png";
import { Text, View, Image, TextInput, ScrollView } from "react-native";
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import { useNavigation } from "@react-navigation/core";
import client from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image source={logo} className="h-7 w-7 bg-gray-300 p-5 rounded-full" />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#F86874" />
          </Text>
        </View>
        <UserIcon size={35} color="#F86874" />
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3 br">
          <SearchIcon size={25} color="gray" />
          <TextInput
            placeholder="Restaurants and Cuisines.."
            keyboardType="default"
          />
        </View>
        <AdjustmentsIcon size={20} color="#F86874" />
      </View>
      {/* Body */}

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Categories */}
        <Categories />
        {/* Featured rows */}
        {featuredCategories?.map((category, index) => (
          <FeaturedRow
            key={index}
            id={category._id}
            title={category.title}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
