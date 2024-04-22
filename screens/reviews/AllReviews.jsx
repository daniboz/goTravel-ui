import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ReviewTle from "./ReviewTle";
import AppBar from "../../components/reusable/AppBar";
import { COLORS } from "../../constants/theme";

const AllReviews = ({navigation, route}) => {
    //const router = useRoute();
    //const id = router.params;
    //const {reviews, isLoading, error, refetch} = fetchReviews(id);

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

      {/* {isLoading ? 
      ( <HorizontalShimmer
        horizontal={false}
        width={'100%'}
        height={95}
        radius={12}
        paddingTop={12}
      />) : (
        <View style={{ paddingTop: 20 }}>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10 }}>
                <ReviewTle
                  review={item}
                  
                />
              </View>
            )}
          />
        </View>
      )} */}

     
        <View style={{ paddingTop: 20 }}>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10 }}>
                <ReviewTle
                  review={item}
                  
                />
              </View>
            )}
          />
        </View>
    </SafeAreaView>
  );
};

export default AllReviews;

const styles = StyleSheet.create({});
