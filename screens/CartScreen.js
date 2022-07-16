import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  decreaseItemCount,
  selectItems,
  selectItemsTotal,
} from "../features/itemSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import logo from "../assets/images/logo.png";
import { ScrollView } from "react-native-gesture-handler";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const CartScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const cartTotal = useSelector(selectItemsTotal);
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const [groupedItemsInCart, setGroupedItemsInCart] = useState([]);

  //   grouping items in cart
  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInCart(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <View className="p-5 border-b border-[#F86874] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center mt-3">
              Current items
            </Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-5 right-3 bg-gray-100 rounded-full"
          >
            <XCircleIcon height={50} width={50} color="#F86874" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={logo}
            className="h-7 w-7 bg-gray-300 p-5 rounded-full"
          />
          <Text className="flex-1">Deliver in 30 - 40 min</Text>
          <TouchableOpacity>
            <Text className="text-[#F86874]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInCart).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#F86874]">{items.length} x</Text>

              <Image
                source={{
                  uri: urlFor(items[0]?.image).url(),
                }}
                className="h-12 w-12 bg-gray-300  rounded-full"
              />

              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="PHP"></Currency>
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-[#F86874] text-xs"
                  onPress={() => dispatch(decreaseItemCount({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={cartTotal} currency="PHP"></Currency>
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Deliver</Text>
            <Text className="text-gray-400">
              <Currency quantity={74} currency="PHP"></Currency>
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              <Currency quantity={cartTotal + 74} currency="PHP"></Currency>
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PrepareOrder")}
            className="bg-[#F86874] p-4 rounded-lg"
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
