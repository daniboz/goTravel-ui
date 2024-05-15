import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Rating, RatingInput } from "react-native-stock-star-rating";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from 'react-native';
import HeightSpacer from "../../../components/reusable/HeightSpacer";
import ReusableText from "../../../components/reusable/ReusableText";
import ReusableBtn from "../../../components/reusable/ReusableBtn";
import AppBar from "../../../components/reusable/AppBar";
import { COLORS, SIZES } from "../../../constants/theme";

const AddAttractionReviews = ({navigation}) => {
  const router = useRoute();
  const placeId = router.params;
  const [rating,setRating] = React.useState(0);
  const [reviewInput, setReviewInput] = useState("");

//   const postReviews = async (review, rating)=> {
//     const userId = await AsyncStorage.getItem('id') 
//     const token = await AsyncStorage.getItem('token') 
//     const accessToken = JSON.parse(token)
//     const id = JSON.parse(userId)

//     const endpoint = 'https://travelappbackend-production.up.railway.app/api/reviews'

//     const data = {
//         "review": review,
//         "rating": rating,
//         "user": id,
//         "place": placeId
//     }

//     try {
//        const response = await axios.post(endpoint,data,
//             {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             }
//           );

//           if(response.status === 200){
//           navigation.replace("HotelDetails", placeId)
//         }
//     } catch (error) {
//        console.log(error);
//     } 
// }


  return (
    <View>
      <View style={{ height: 100 }}>
      <AppBar
        top={60}
        left={20}
        right={20}
        title={'Add Comment'}
        color={COLORS.grey}
        onPress={() => navigation.goBack()}
        
      />
      </View>

      <View style={{ margin: 20, paddingTop: 30 }}>
        <ReusableText
          text={"Rate your stay"}
          family={"medium"}
          size={SIZES.large - 3}
          color={COLORS.black}
        />

        <HeightSpacer height={15} />

        <RatingInput rating={rating} setRating={setRating} size={70}  maxStars={5} bordered={false}  color={"#FD9942"}/>

        <HeightSpacer height={15} />

        <ReusableText
          text={"Your review"}
          family={"medium"}
          size={SIZES.large - 3}
          color={COLORS.black}
        />

        <HeightSpacer height={15} />

        <View style={styles.wrapper}>
          <TextInput
            style={styles.input}
            value={reviewInput}
            onChangeText={setReviewInput}
            placeholder="Write your stay experience"
          />
        </View>

        <HeightSpacer height={20} />

        <ReusableBtn
          //onPress={()=> { postReviews(reviewInput, rating)}}
          btnText={"Submit your review"}
          width={SIZES.width - 50}
          backgroundColor={COLORS.green}
          borderColor={COLORS.green}
          borderWidth={0.5}
          textColor={COLORS.white}
        />
      </View>
    </View>
  );
};

export default AddAttractionReviews;

const styles = StyleSheet.create({
  input: {
      fontFamily: "regular",
      width: "100%",
      height: "100%",
      paddingHorizontal: SIZES.small
  },
  wrapper: {
      width: SIZES.width-50,
      height: 50,
      backgroundColor: COLORS.lightWhite,
      marginRight: SIZES.small,
      borderRadius: SIZES.small 
  }
})