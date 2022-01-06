import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../components/SignInScreen/SignInScreen";
import SignUpScreen from "../components/SignUpScreen/SignUpScreen"

const Stack = createStackNavigator();

const Navigation = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </Stack.Navigator>
  );
};

export default Navigation;
