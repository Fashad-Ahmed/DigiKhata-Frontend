import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { numberWithCommas } from "../utils/format";
import SERVER_URL from "../../constants";

export default function TransactionList({ item, deleteTransaction }) {
  let sign = +item.amount < 0 ? "-" : "+";

  useEffect(() => {
    fetch(SERVER_URL + "/tran/show", {
      method: "GET",
      headers: { "content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        // transactions(result);
        console.log(result);
        console.log("trannhdwefwfu ------ > ", item);
      });
  }, [item]);
  return (
    <TouchableOpacity
      style={[styles.listItem, +item.amount < 0 ? styles.minus : styles.plus]}
    >
      <View style={styles.listItemView}>
        <View style={styles.viewWrapper}>
          <FontAwesome
            name="remove"
            size={20}
            color="firebrick"
            onPress={() =>
              Alert.alert(
                "Delete Account",
                "Are you sure you want to delete this ?",
                [
                  { text: "Yes", onPress: () => deleteTransaction(item.id) },
                  { text: "No" },
                ]
              )
            }
          />
          <Text style={[styles.ml, styles.color]}>{item.name}</Text>
        </View>
        <Text style={styles.color}>
          {" "}
          {sign}PKR {numberWithCommas(Math.abs(+item.amount).toFixed(2))}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "white",
    justifyContent: "space-between",
    position: "relative",
    padding: 10,
    marginTop: 10,
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
  plus: {
    borderRightColor: "#2ecc71",
    borderRightWidth: 5,
  },
  minus: {
    borderRightColor: "#c0392b",
    borderRightWidth: 5,
  },
});
