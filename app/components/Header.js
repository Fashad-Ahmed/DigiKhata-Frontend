import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Digi Khata</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    alignSelf: "stretch",
    padding: 15,
    backgroundColor: "black",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 23,
  },
});
