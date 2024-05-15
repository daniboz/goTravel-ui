import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import EventReviewTle from './EventReviewTle';

const EventReviewsList = ({ reviews }) => {
  return (
    <FlatList 
      data={reviews}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 10 }}>
          <EventReviewTle review={item} />
        </View>
      )}
    />
  );
}

export default EventReviewsList;

const styles = StyleSheet.create({});
