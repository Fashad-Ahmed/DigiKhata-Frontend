import React, { useState, useEffect } from "react";
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

import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "../Header";
import Balance from "../Balance";
import IncomeExpenses from "../IncomeExpenses";
import TransactionList from "../TransactionList";
import AddTransaction from "../AddTransaction";

import SERVER_URL from "../../../constants/index";

const Homescreen = () => {
  const homeNavigation = useNavigation();

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      amount: "1400",
      name: "Deposit",
    },
    {
      id: 2,
      amount: "-20",
      name: "Dinner",
    },
    {
      id: 3,
      amount: "-500",
      name: "Camera",
    },
  ]);

  const deleteTransaction = (id) => {
    setTransactions((prevTransactions) => {
      return prevTransactions.filter((transaction) => transaction.id !== id);
    });
  };

  const addTransaction = (e, transaction) => {
    e.preventDefault();
    const acc = { ...transaction };
    try {
      fetch(SERVER_URL + "/tran/saveTran", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(acc),
      })
        .then(() => {
          console.log("transaction data added successfully");
          settotalData((prevTransactions) => {
            return [{ id: uuid.v1(), ...transaction }, ...prevTransactions];
          });
        })
        .catch(() => {
          console.log("transaction failed");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("APP FLOW");
  }, []);
  return (
    <ScrollView style={styles.scrollView}>
      <Header />
      <View style={styles.bodyWrapper}>
        <Balance transactions={transactions} />
        <IncomeExpenses transactions={transactions} />
        <TransactionList
          transactions={transactions}
          deleteTransaction={deleteTransaction}
        />
        <AddTransaction addTransaction={addTransaction} />
      </View>
    </ScrollView>
  );
};

export const HomeNavigator = () => (
  <homeNavigation.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <homeNavigation.Screen name="Home" component={Homescreen} />
  </homeNavigation.Navigator>
);
export default Homescreen;

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
