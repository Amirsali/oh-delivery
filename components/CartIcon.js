import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectItems, selectItemsTotal } from "../features/itemSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

const CartIcon = () => {
  const items = useSelector(selectItems);
  const navigation = useNavigation();
  const cartTotal = useSelector(selectItemsTotal);
  if (items.length === 0) {
    return null;
  }

  return (
    <View className="absolute bottom-12 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
        className="mx-5 bg-[#F86874] p-3 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white font-extraBold text-lg bg-gray-500 py-1 px-4 rounded-full ">
          {items.length}
        </Text>

        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Cart
        </Text>

        <Text className="text-lg text-white font-extrabold">
          <Currency quantity={cartTotal} currency="PHP" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartIcon;
