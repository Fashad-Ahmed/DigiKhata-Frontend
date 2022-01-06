import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Navigation from "../../navigation/index";
import Logo from "../../assets/download.png";
import CustomButton from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import SocialSignInButtons from "../SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import Homescreen from "../Homescreen/Homescreen";

import SERVER_URL from "../../../constants/index";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();

  const navigation = useNavigation();

  useEffect(() => {
    console.log("SIGN IN");
  }, []);

  const onSignInPressed = (e) => {
    const user = { email, password };
    console.log(user);
    try {
      fetch(SERVER_URL + "/auth/signin", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.result.statusCode);
          if (res.result.statusCode == 200) {
            console.log("logged In successfully");
            navigation.navigate("Home");
          }
        })
        .catch(() => {
          console.log("Unable to log user");
          navigation.navigate("SignIn");
        });
    } catch (err) {
      console.warn("Invalid Credentials!");
      navigation.navigate("SignIn");
    }
  };

  const onSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput placeholder="email" value={email} setValue={setEmail} />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />

        <CustomButton text="Sign In" onPress={onSignInPressed} />

        <CustomButton text="Forgot password?" type="TERTIARY" />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
