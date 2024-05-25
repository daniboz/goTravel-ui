import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchEvents();
    }
  }, [isFocused]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter(event =>
          event.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, events]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5003/api/events');
      setEvents(response.data);
      setFilteredEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDelete(id),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5003/api/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const renderEvent = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('AdminEventForm', { id: item._id })} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => confirmDelete(item._id)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for an event"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => navigation.navigate('AdminEventForm')} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Event</Text>
        </TouchableOpacity>
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item._id}
          renderItem={renderEvent}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  itemText: {
    fontSize: 18,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default AdminEventsPage;
