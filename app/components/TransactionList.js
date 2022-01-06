import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { heading } from "../styles/heading";
import Transaction from "./Transaction";

export default function TransactionList({ transactions, deleteTransaction }) {
  // useEffect(() => {
  //   fetch(SERVER_URL + "/tran/show", {
  //     method: "GET",
  //     headers: { "content-Type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       // transactions(result);
  //       console.log(result);
  //       console.log('trannhdwefwfu ------ > ', transactions.item)
  //     });
  // }, [transactions.item]);

  return (
    <View style={styles.container}>
      <Text style={[heading.h4, heading.subTitle]}>TRansactions</Text>
      {transactions.map((item) => {
        return (
          <Transaction
            key={item._id}
            item={item}
            deleteTransaction={deleteTransaction}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
});
