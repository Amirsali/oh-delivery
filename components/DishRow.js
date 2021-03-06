import { View, Text, TouchableOpacity, Image } from "react-native";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import React, { useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import {
  increaseItemCount,
  selectItemsWithId,
  decreaseItemCount,
} from "../features/itemSlice.js";
import { useSelector, useDispatch } from "react-redux";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectItemsWithId(state, id));

  const dispatch = useDispatch();

  const AddToCart = () => {
    dispatch(increaseItemCount({ id, name, description, price, image }));
  };

  const removeFromCart = () => {
    if (!items.length > 0) return;

    dispatch(decreaseItemCount({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsPressed(!isPressed);
        }}
        className={`"bg-white border p-4 border-gray-200" ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="PHP" />
            </Text>
          </View>
          <View>
            <Image
              style={{ borderWidth: 1, borderColor: "#F3F3F4" }}
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3 ">
            <TouchableOpacity
              onPress={removeFromCart}
              disabled={items.length === 0}
            >
              <MinusCircleIcon
                size={35}
                color={items.length > 0 ? "#F86874" : "gray"}
              />
            </TouchableOpacity>
            {/* show total items */}
            <Text className="text-gray-500">{items.length}</Text>
            <TouchableOpacity onPress={AddToCart}>
              <PlusCircleIcon size={35} color="#F86874" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
