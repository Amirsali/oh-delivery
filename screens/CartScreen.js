import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectItems, selectItemsTotal } from "../features/itemSlice";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  //   get the items in redux
  const items = useSelector(selectItems);
  const navigation = useNavigation();
  const cartTotal = useSelector(selectItemsTotal);

  return (
    <View>
      <Text>CartScreen</Text>
    </View>
  );
};

export default CartScreen;
