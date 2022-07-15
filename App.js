import React from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import CartScreen from "./screens/CartScreen";
import "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                screenOptions={{ headerShown: false }}
              />
              <Stack.Screen
                name="Restaurant"
                component={RestaurantScreen}
                screenOptions={{ headerShown: false }}
              />
            </Stack.Group>
            <Stack.Group
              screenOptions={{ headerShown: false, presentation: "modal" }}
            >
              <Stack.Screen name="Cart" component={CartScreen} />
            </Stack.Group>
          </Stack.Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}
