import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Switch, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/theme';
import SearchComponent from '../../components/search/SearchComponent';
import { createCalendarEntry, updateCalendarEntry, searchItems } from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EntryForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedDate, existingEntry } = route.params || {};

  const [description, setDescription] = useState(existingEntry ? existingEntry.name : '');
  const [date, setDate] = useState(existingEntry ? new Date(existingEntry.start) : new Date(selectedDate));
  const [startTime, setStartTime] = useState(existingEntry ? new Date(existingEntry.start) : new Date());
  const [endTime, setEndTime] = useState(existingEntry ? new Date(existingEntry.end) : new Date());
  const [selectedAttraction, setSelectedAttraction] = useState(existingEntry ? existingEntry.attraction : null);
  const [selectedEvent, setSelectedEvent] = useState(existingEntry ? existingEntry.event : null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(existingEntry ? existingEntry.restaurant : null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [isAllDay, setIsAllDay] = useState(existingEntry ? existingEntry.isAllDay : false);
  const [isEndTimeEnabled, setIsEndTimeEnabled] = useState(existingEntry && existingEntry.end ? true : false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const retrievedToken = await AsyncStorage.getItem('token');
      console.log('Retrieved token:', retrievedToken);
      if (retrievedToken) {
        setToken(retrievedToken);
      } else {
        console.error('Token is undefined');
      }
    };
    loadToken();
  }, []);

  const handleSave = async () => {
    if (!token) {
      console.error('Token is undefined');
      Alert.alert('Error', 'Token is undefined');
      return;
    }

    let start;
    let end = null;

    if (isAllDay) {
      start = date.toISOString();
    } else {
      const startDateTime = new Date(date);
      startDateTime.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);
      start = startDateTime.toISOString();

      if (isEndTimeEnabled) {
        const endDateTime = new Date(date);
        endDateTime.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);
        end = endDateTime.toISOString();
      }
    }

    const newEntry = {
      name: description,
      start,
      end,
      isAllDay,
      attraction: selectedAttraction ? selectedAttraction._id : null,
      event: selectedEvent ? selectedEvent._id : null,
      restaurant: selectedRestaurant ? selectedRestaurant._id : null,
    };

    console.log('New entry data:', newEntry);

    try {
      if (existingEntry) {
        await updateCalendarEntry(existingEntry._id, newEntry, token);
      } else {
        await createCalendarEntry(newEntry, token);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving entry:', error);
      Alert.alert('Error', 'Failed to save entry');
    }
  };
  

  const handleSearch = async (query) => {
    try {
      const response = await searchItems(query, token);
      return [
        ...response.attractions,
        ...response.events,
        ...response.restaurants,
      ];
    } catch (error) {
      console.error('Error searching:', error);
      Alert.alert('Error', 'Failed to search items');
      return [];
    }
  };

  const handleSelect = (item) => {
    console.log('Selected item:', item);
    if (item.__typename === 'Attraction') {
      setSelectedAttraction(item);
      setSelectedEvent(null);
      setSelectedRestaurant(null);
    } else if (item.__typename === 'Event') {
      setSelectedEvent(item);
      setSelectedAttraction(null);
      setSelectedRestaurant(null);
    } else if (item.__typename === 'Restaurant') {
      setSelectedRestaurant(item);
      setSelectedAttraction(null);
      setSelectedEvent(null);
    }
  };

  const clearSelection = () => {
    setSelectedAttraction(null);
    setSelectedEvent(null);
    setSelectedRestaurant(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchComponent onSearch={handleSearch} placeholder="Link an attraction, event or restaurant" onSelect={handleSelect} />

      {selectedAttraction && (
        <View style={styles.selectedItemContainer}>
          <Text style={styles.selectedItemText}>Linked to: {selectedAttraction.name}</Text>
          <TouchableOpacity onPress={clearSelection}>
            <Icon name="close" size={20} color={COLORS.red} />
          </TouchableOpacity>
        </View>
      )}
      {selectedEvent && (
        <View style={styles.selectedItemContainer}>
          <Text style={styles.selectedItemText}>Linked to: {selectedEvent.name}</Text>
          <TouchableOpacity onPress={clearSelection}>
            <Icon name="close" size={20} color={COLORS.red} />
          </TouchableOpacity>
        </View>
      )}
      {selectedRestaurant && (
        <View style={styles.selectedItemContainer}>
          <Text style={styles.selectedItemText}>Linked to: {selectedRestaurant.name}</Text>
          <TouchableOpacity onPress={clearSelection}>
            <Icon name="close" size={20} color={COLORS.red} />
          </TouchableOpacity>
        </View>
      )}

      <TextInput
        style={[styles.input, styles.extraMargin]}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.pickerContainer}>
        <Text style={styles.pickerText}>{date.toDateString()}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(selectedDate) => {
          setDatePickerVisibility(false);
          setDate(selectedDate);
        }}
        onCancel={() => setDatePickerVisibility(false)}
        style={styles.dateTimePicker}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>All Day</Text>
        <Switch
          value={isAllDay}
          onValueChange={setIsAllDay}
        />
      </View>

      {!isAllDay && (
        <>
          <Text style={styles.label}>Start Time</Text>
          <TouchableOpacity onPress={() => setStartTimePickerVisibility(true)} style={styles.pickerContainer}>
            <Text style={styles.pickerText}>{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode="time"
            onConfirm={(selectedTime) => {
              setStartTimePickerVisibility(false);
              setStartTime(selectedTime);
            }}
            onCancel={() => setStartTimePickerVisibility(false)}
            style={styles.dateTimePicker}
          />

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Include End Time</Text>
            <Switch
              value={isEndTimeEnabled}
              onValueChange={setIsEndTimeEnabled}
            />
          </View>

          {isEndTimeEnabled && (
            <>
              <Text style={styles.label}>End Time</Text>
              <TouchableOpacity onPress={() => setEndTimePickerVisibility(true)} style={styles.pickerContainer}>
                <Text style={styles.pickerText}>{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                onConfirm={(selectedTime) => {
                  setEndTimePickerVisibility(false);
                  setEndTime(selectedTime);
                }}
                onCancel={() => setEndTimePickerVisibility(false)}
                style={styles.dateTimePicker}
              />
            </>
          )}
        </>
      )}

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: '100%',
  },
  pickerText: {
    fontSize: 16,
    color: COLORS.black,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: COLORS.red,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateTimePicker: {
    alignSelf: 'stretch',
  },
  selectedItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6ffe6',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.green,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedItemText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: COLORS.green,
    textAlign: 'center',
    marginRight: 10,
  },  
});

export default EntryForm;
