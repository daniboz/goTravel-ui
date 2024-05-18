import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

const EventsPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { events } = route.params || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {events && events.length > 0 ? (
          <>
            <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('EventsFilter')}>
              <Text style={styles.filterButtonText}>Filter</Text>
              <Ionicons name="options-outline" size={24} color="black" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
            <ScrollView style={styles.eventsList}>
              {events.map((event, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.eventCard}
                  onPress={() => navigation.navigate('EventDetails', { event })}
                >
                  <Image source={{ uri: event.imageUrl }} style={styles.image} />
                  <View style={styles.textContainer}>
                    <Text style={styles.imageText}>{event.name}</Text>
                    <Text style={styles.dateText}>{event.date}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No events found</Text>
            <Button
              title="Search Again"
              onPress={() => navigation.navigate('EventsWhereTo')}
              color={COLORS.red}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  filterButton: {
    flexDirection: 'row', 
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 5,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center', 
  },
  filterButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,  
  },
  eventsList: {
    marginTop: 10,
  },
  eventCard: {
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  imageText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    color: 'gray',
    fontSize: 14,
    marginTop: 5,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: COLORS.gray,
    marginBottom: 20,
  }
});

export default EventsPage;
