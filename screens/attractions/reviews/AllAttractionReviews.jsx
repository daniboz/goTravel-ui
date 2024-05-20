import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AttractionReviewTle from "./AttractionReviewTle";
import AppBar from "../../../components/reusable/AppBar";
import { COLORS, TAB_BAR_HEIGHT } from "../../../constants/theme";

const AllAttractionReviews = ({navigation, route}) => {

    const { reviews = {} } = route.params || {};

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

      <ScrollView style={styles.scrollView}>
        <View style={{ paddingTop: 20 }}>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10 }}>
                <AttractionReviewTle
                  review={item}
                  
                />
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllAttractionReviews;

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 10,
    marginBottom: TAB_BAR_HEIGHT,
  },
});
