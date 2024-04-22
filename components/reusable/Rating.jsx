import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WidthSpacer from "./WidthSpacer";
import ReusableText from "./ReusableText";

const Rating = ({ rating }) => {
  return (
    <View style={styles.rowWithSpace("flex-start")}>
      <MaterialCommunityIcons name="star" size={20} color={"#FD9942"} />
      <WidthSpacer width={5} />

      <ReusableText
        text={rating}
        family={"medium"}
        size={15}
        color={"#FD9942"}
      />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  rowWithSpace:(justifyContent)=> ({
    flexDirection:"row",
    alignItems: "center",
    justifyContent: justifyContent
}) 
});
