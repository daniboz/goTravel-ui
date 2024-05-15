import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EventReviewTle from "./EventReviewTle";
import AppBar from "../../../components/reusable/AppBar";
import { COLORS } from "../../../constants/theme";

const AllEventReviews = ({ navigation, route }) => {
  const { reviews = [] } = route.params || {};

  return (
    <SafeAreaView style={{ marginHorizontal: 20 }}>
      <View style={{ height: 50 }}>
        <AppBar
          top={10}
          left={0}
          right={0}
          title={"Reviews"}
          color={COLORS.grey}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={{ paddingTop: 20 }}>
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <EventReviewTle review={item} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllEventReviews;

const styles = StyleSheet.create({});
