import React, { useState, useEffect, useFetch } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

import { heading } from "../../styles/heading";
import { numberWithCommas } from "../../utils/format";
import SERVER_URL from "../../../constants";

export default function Account({ item }) {
  const navigation = useNavigation();

  const [account, setAccount] = useState({
    name: "",
    balance: "",
  });
  const [data, settotalData] = useState([]);

  useEffect(() => {
    fetch(SERVER_URL + "/account/show", {
      method: "GET",
      headers: { "content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        settotalData(result);
        console.log(data);
        console.log(result);
      });
  }, [data]);

  const onAddPressed = (e, account) => {
    e.preventDefault();
    const acc = { ...account };
    try {
      fetch(SERVER_URL + "/account/create", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(acc),
      })
        .then(() => {
          console.log("data added successfully");
          settotalData((prevTransactions) => {
            return [{ id: uuid.v1(), ...account }, ...prevTransactions];
          });
        })
        .catch(() => {
          console.log("Unable to add  account");
        });
    } catch (error) {
      console.log(error);
    }
    console.log("added");
    console.log(account);
  };

  const handleNameChange = (textValue) => {
    setAccount((prevAccount) => ({
      ...prevAccount,
      name: textValue,
    }));
  };

  const handleAmountChange = (textValue) => {
    setAccount((prevAccount) => ({
      ...prevAccount,
      balance: textValue,
    }));
  };

  const clearForm = () => {
    setAccount({ name: "", balance: "" });
  };

  let sign = +account.balance < 0 ? "-" : "+";

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View style={styles.header}>
        <Text style={styles.text}>ACCOUNT</Text>
      </View>
      <View>
        <TextInput
          placeholder="Enter Name of Account..."
          style={styles.input}
          onChangeText={handleNameChange}
          value={account.name}
        />

        <TextInput
          placeholder="Enter Amount..."
          style={styles.input}
          onChangeText={handleAmountChange}
          value={account.balance}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={(e) => {
            clearForm();
            onAddPressed(e, account);
          }}
        >
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn2}
          onPress={(e) => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.btnText}>Back To Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={[heading.h4, heading.subTitle]}>Accounts</Text>
        {data.map((item) => {
          return (
            <View style={styles.listItemView} key={item._id}>
              <Text style={[styles.ml, styles.color]}>{item.accountName}</Text>

              <View style={styles.viewWrapper}>
                <Text style={styles.color}>
                  {" "}
                  {sign}PKR{" "}
                  {numberWithCommas(Math.abs(+item.accountBalance).toFixed(2))}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 2,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
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
  btnText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  header: {
    height: 60,
    alignSelf: "stretch",
    padding: 15,
    backgroundColor: "black",
    marginBottom: 25,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 23,
  },
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  viewWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ml: {
    marginLeft: 5,
  },
  color: {
    color: "#333",
  },
});
