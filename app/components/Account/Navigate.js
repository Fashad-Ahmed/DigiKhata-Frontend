import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "./index";

const Stack = createStackNavigator();

const AccountNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
};

export default AccountNavigation;