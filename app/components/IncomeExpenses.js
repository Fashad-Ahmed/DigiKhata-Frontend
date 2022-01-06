import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { heading } from "../styles/heading";
import { numberWithCommas } from "../utils/format";

export default function IncomeExpenses({ transactions }) {
  let expense = 0,
    income = 0;

  transactions.map((transaction) =>
    +transaction.amount < 0
      ? (expense += +transaction.amount)
      : (income += +transaction.amount)
  );

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.firstBox]}>
        <Text style={heading.h4}>Income</Text>
        <Text style={styles.money}>PKR{numberWithCommas(income.toFixed(2))}</Text>
      </View>
      <View style={styles.box}>
        <Text style={heading.h4}>Expense</Text>
        <Text style={styles.money}>
          PKR{numberWithCommas(Math.abs(expense).toFixed(2))}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
    alignSelf: "stretch",
    backgroundColor: "white",
  },
  box: {
    flex: 1,
    alignItems: "center",
  },
  firstBox: {
    borderRightColor: "#dedede",
    borderRightWidth: 1,
  },
  money: {
    fontSize: 20,
    letterSpacing: 1,
    margin: 5,
  },
});
