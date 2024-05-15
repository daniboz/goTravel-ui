import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NetworkImage from "../../../components/reusable/NetworkImage";
import Rating from "../../../components/reusable/Rating";
import ReusableText from "../../../components/reusable/ReusableText";
import WidthSpacer from "../../../components/reusable/WidthSpacer";
import ExpandableText from "../../../components/reusable/ExpandableText";
import { COLORS, SIZES } from "../../../constants/theme";

const AttractionReviewTle = ({ review }) => {
  return (
    <View style={styles.reviewBorder}>
      <View style={styles.rowWithSpace("space-between")}>
        <View style={styles.rowWithSpace("flex-start")}>
          <NetworkImage
            source={review.user.profile}
            width={54}
            height={54}
            radius={10}
          />

          <WidthSpacer width={20} />

          <View style={{width: "80%"}}>
            <View style={styles.rowWithSpace("space-between")}>
              <ReusableText
                text={review.user.username}
                family={"medium"}
                size={SIZES.small + 2}
                color={COLORS.black}
              />
              <WidthSpacer width={"30%"} />

              <View style={styles.rowWithSpace("space-between")}>
                <Rating rating={review.rating} />
                <WidthSpacer width={10} />
                <ReusableText
                  text={review.updatedAt.split('T')[0]}
                  family={"medium"}
                  size={SIZES.small + 2}
                  color={COLORS.black}
                />
              </View>
            </View>

            <ExpandableText text={review.review} numberOfLines={2}/>
          </View>

          
        </View>
      </View>
    </View>
  );
};

export default AttractionReviewTle;

const styles = StyleSheet.create({
  reviewBorder: {
      paddingBottom: 10,
      borderBottomWidth: 0.5,
      borderColor: COLORS.lightGrey
  },
  rowWithSpace:(justifyContent)=> ({
    flexDirection:"row",
    alignItems: "center",
    justifyContent: justifyContent
  }),
})
