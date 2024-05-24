// import React, { useEffect, useState } from 'react';
// import { FlatList, StyleSheet, View, Text } from 'react-native';
// import RestaurantReviewTle from './RestaurantReviewTle';

// const fetchUserData = async (userId) => {
//   try {
//     console.log(`Fetching user data for userId: ${userId}`); // Debug log
//     const response = await fetch(`http://localhost:5003/api/users/${userId}`);
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error(`Error fetching user data for ${userId}:`, errorText);
//       throw new Error('Failed to fetch user data');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error in fetchUserData:', error);
//     throw error;
//   }
// };

// const fetchReviewsWithUserDetails = async (reviews) => {
//   return await Promise.all(
//     reviews.map(async (review) => {
//       try {
//         // Ensure userId is correctly extracted whether `user` is an object or a string
//         const userId = typeof review.user === 'object' ? review.user._id : review.user;
//         if (!userId) {
//           throw new Error('User ID is missing');
//         }
//         const userData = await fetchUserData(userId);
//         return { ...review, user: userData };
//       } catch (error) {
//         console.error(`Error fetching user data for review: ${JSON.stringify(review)}`, error);
//         return { ...review, user: null };
//       }
//     })
//   );
// };

// const RestaurantReviewsList = ({ reviews, onDeleteReview }) => {
//   const [reviewsWithUserDetails, setReviewsWithUserDetails] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAndSetReviews = async () => {
//       try {
//         const detailedReviews = await fetchReviewsWithUserDetails(reviews);
//         setReviewsWithUserDetails(detailedReviews);
//       } catch (err) {
//         setError('Failed to fetch reviews with user details.');
//         console.error('Error fetching reviews with user details:', err);
//       }
//     };
//     fetchAndSetReviews();
//   }, [reviews]);

//   if (error) {
//     return <Text>{error}</Text>;
//   }

//   return (
//     <FlatList 
//       data={reviewsWithUserDetails.slice(0, 2)} // Only display the first 2 reviews
//       scrollEnabled={false}
//       showsVerticalScrollIndicator={false}
//       keyExtractor={(item) => item._id}
//       renderItem={({ item }) => (
//         <View style={{ marginBottom: 10 }}>
//           <RestaurantReviewTle review={item}  onDelete={onDeleteReview}/>
//         </View>
//       )}
//     />
//   );
// };

// export default RestaurantReviewsList;

// const styles = StyleSheet.create({});

import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import RestaurantReviewTle from './RestaurantReviewTle';

const fetchUserData = async (userId) => {
  try {
    console.log(`Fetching user data for userId: ${userId}`); // Debug log
    const response = await fetch(`http://localhost:5003/api/users/${userId}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching user data for ${userId}:`, errorText);
      throw new Error('Failed to fetch user data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in fetchUserData:', error);
    throw error;
  }
};

const fetchReviewsWithUserDetails = async (reviews) => {
  return await Promise.all(
    reviews.map(async (review) => {
      try {
        // Ensure userId is correctly extracted whether `user` is an object or a string
        const userId = typeof review.user === 'object' ? review.user._id : review.user;
        if (!userId) {
          throw new Error('User ID is missing');
        }
        const userData = await fetchUserData(userId);
        return { ...review, user: userData };
      } catch (error) {
        console.error(`Error fetching user data for review: ${JSON.stringify(review)}`, error);
        return { ...review, user: null };
      }
    })
  );
};

const RestaurantReviewsList = ({ reviews, onDeleteReview }) => {
  const [reviewsWithUserDetails, setReviewsWithUserDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndSetReviews = async () => {
      try {
        const detailedReviews = await fetchReviewsWithUserDetails(reviews);
        setReviewsWithUserDetails(detailedReviews);
      } catch (err) {
        setError('Failed to fetch reviews with user details.');
        console.error('Error fetching reviews with user details:', err);
      }
    };
    fetchAndSetReviews();
  }, [reviews]);

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <FlatList 
      data={reviewsWithUserDetails.slice(0, 2)} // Only display the first 2 reviews
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 10 }}>
          <RestaurantReviewTle review={item} onDelete={onDeleteReview} />
        </View>
      )}
    />
  );
};

export default RestaurantReviewsList;

const styles = StyleSheet.create({});