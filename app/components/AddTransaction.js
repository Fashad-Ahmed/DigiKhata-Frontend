import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { heading } from "../styles/heading";

export default function TransactionList({ addTransaction }) {
  const navigation = useNavigation();

  const [transaction, setTransaction] = useState({
    name: "",
    amount: "",
  });

  const handleNameChange = (textValue) => {
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      name: textValue,
    }));
  };

  const handleAmountChange = (textValue) => {
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      amount: textValue,
    }));
  };

  const clearForm = () => {
    setTransaction({ name: "", amount: "" });
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key');
      navigation.navigate('Auth');
    } catch(e) {
      console.log(e)
    }
  
    console.log('Done.')
  }
  return (
    <View>
      <Text style={[heading.h4, heading.subTitle]}>Add New Transaction</Text>
      <Text style={styles.mtb}>Name</Text>
      <TextInput
        placeholder="Enter Name..."
        style={styles.input}
        onChangeText={handleNameChange}
        value={transaction.name}
      />
      <Text
        style={styles.mtb}
      >{`Amount \n(income is positive, expense is negative)`}</Text>
      <TextInput
        placeholder="Enter Amount..."
        style={styles.input}
        keyboardType="numeric"
        onChangeText={handleAmountChange}
        value={transaction.amount}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={(e) => {
          clearForm();
          addTransaction(e, transaction);
        }}
      >
        <Text style={styles.btnText}>Add transaction</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn2}
        onPress={(e) => {
          navigation.navigate("Account");
        }}
      >
        <Text style={styles.btnText}>Go To Accounts Section</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn3} 
      onPress={(e) => {
        removeValue()
      }}>
        <Text style={styles.btnText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 2,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mtb: {
    marginTop: 10,
    marginBottom: 5,
  },
  btn: {
    marginTop: 10,
    backgroundColor: "#f27500",
    padding: 9,
  },
  btn2: {
    marginTop: 10,
    backgroundColor: "orange",
    padding: 9,
  },
  btn3: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 9,
  },
  btnText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
