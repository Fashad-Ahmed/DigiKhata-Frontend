import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import uuid from "react-native-uuid";

import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Navigation from "./app/navigation";
import Homescreen from "./app/components/Homescreen/Homescreen";
import AccountNavigation from "./app/components/Account/Navigate";

const AppStack = createStackNavigator();

export default function App() {
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      return jsonValue;
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "android" ? "padding" : "height"}
      >
        <NavigationContainer>
          <AppStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {/* { getData(jsonValue);
            if ( jsonValue != null ){
              <AppStack.Screen name="Home" component={Homescreen} />

            } else{
              <AppStack.Screen name="Auth" component={Navigation} />

            }
            } */}
            <AppStack.Screen name="Auth" component={Navigation} />
            <AppStack.Screen name="Home" component={Homescreen} />
            <AppStack.Screen name="Account" component={AccountNavigation} />
          </AppStack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollView: {},
  bodyWrapper: {
    alignSelf: "stretch",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  },
});
