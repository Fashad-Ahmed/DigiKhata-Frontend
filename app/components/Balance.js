import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { heading } from "../styles/heading";
import { numberWithCommas } from "../utils/format";

export default function Balance({ transactions }) {
  let balance = 0;

  transactions.map((transaction) => (balance += +transaction.amount));

  return (
    <View style={styles.container}>
      <Text style={heading.h4}>Your Balance:</Text>
      <Text style={styles.balance}>
        PKR {numberWithCommas(balance.toFixed(2))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 10,
  },
  balance: {
    fontSize: 25,
  },
});
