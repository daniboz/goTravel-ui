import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TAB_BAR_HEIGHT } from '../../constants/theme';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteCalendarEntry, getCalendarEntries } from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Calendar = () => {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const loadTokenAndItems = useCallback(async () => {
    const retrievedToken = await AsyncStorage.getItem('token');
    if (retrievedToken) {
      console.log('Token retrieved:', retrievedToken);
      setToken(retrievedToken);
      await loadItems(selectedDate, retrievedToken);
    } else {
      console.log('Token not found');
      setLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (isFocused) {
      loadTokenAndItems();
    }
  }, [isFocused, loadTokenAndItems]);

  const loadItems = async (dateString, token) => {
    if (!token) {
      Alert.alert('Error', 'Token is undefined');
      return;
    }

    try {
      setLoading(true);
      console.log('Loading items for date:', dateString);
      const response = await getCalendarEntries(token);
      console.log('Calendar entries loaded:', response.data);

      const newItems = { ...items };

      response.data.forEach((entry) => {
        const date = entry.start ? entry.start.split('T')[0] : entry.createdAt.split('T')[0];
        if (!newItems[date]) {
          newItems[date] = [];
        }

        // Check for duplicate entries
        const isDuplicate = newItems[date].some(item => item._id === entry._id);
        if (!isDuplicate) {
          newItems[date].push({
            _id: entry._id,
            name: entry.name,
            start: entry.start,
            end: entry.end,
            isAllDay: entry.isAllDay,
            attraction: entry.attraction,
            event: entry.event,
            restaurant: entry.restaurant,
          });
        }
      });

      if (!newItems[dateString]) {
        newItems[dateString] = [];
      }

      console.log('New items state:', newItems);
      setItems(newItems);
    } catch (error) {
      console.error('Error loading items:', error);
      Alert.alert('Error', 'Failed to load calendar entries');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (!token) {
      return;
    }

    try {
      console.log('Deleting item with id:', itemId);
      await deleteCalendarEntry(itemId, token);
      console.log('Item deleted:', itemId);
      await loadItems(selectedDate, token);
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert('Error', 'Failed to delete calendar entry');
    }
  };

  const handleEdit = (item) => {
    console.log('Editing item:', item);
    navigation.navigate('EntryForm', { existingEntry: item });
  };

  const handleNavigateToDetail = (item) => {
    console.log('Navigating to detail for item:', item);
    if (item.attraction) {
      navigation.navigate('AttractionDetails', { attractionId: item.attraction._id });
    } else if (item.event) {
      navigation.navigate('EventDetails', { eventId: item.event._id });
    } else if (item.restaurant) {
      navigation.navigate('RestaurantDetails', { restaurantId: item.restaurant._id });
    } else {
      Alert.alert('No detail available', 'This entry does not have associated details.');
    }
  };

  const renderItem = (item) => (
    <View key={item._id} style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleNavigateToDetail(item)} style={styles.item}>
        <View style={styles.itemContent}>
          <Text style={styles.itemText}>{item.name}</Text>
          {item.isAllDay ? (
            <Text style={styles.timeText}>All Day</Text>
          ) : (
            <Text style={styles.timeText}>
              {item.start ? item.start.split('T')[1].split('.')[0] : ''} - {item.end ? item.end.split('T')[1].split('.')[0] : ''}
            </Text>
          )}
          {item.attraction && (
            <TouchableOpacity onPress={() => handleNavigateToDetail(item)} style={styles.detailButton}>
              <Text style={styles.detailButtonText}>View {item.attraction.name}</Text>
            </TouchableOpacity>
          )}
          {item.event && (
            <TouchableOpacity onPress={() => handleNavigateToDetail(item)} style={styles.detailButton}>
              <Text style={styles.detailButtonText}>View {item.event.name}</Text>
            </TouchableOpacity>
          )}
          {item.restaurant && (
            <TouchableOpacity onPress={() => handleNavigateToDetail(item)} style={styles.detailButton}>
              <Text style={styles.detailButtonText}>View {item.restaurant.name}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => handleEdit(item)} style={styles.iconButton}>
            <Icon name="edit" size={20} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.iconButton}>
            <Icon name="delete" size={20} color={COLORS.red} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  const handleDayPress = (day) => {
    console.log('Day pressed:', day);
    setSelectedDate(day.dateString);
    setItems({});
    loadItems(day.dateString, token);
  };

  const handleMonthChange = (month) => {
    console.log('Month changed:', month);
    loadItems(month.dateString, token);
  };

  if (loading && Object.keys(items).length === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.red} />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={handleMonthChange}
        onDayPress={handleDayPress}
        selected={selectedDate}
        renderItem={renderItem}
        renderEmptyDate={() => (
          <View style={styles.emptyDate}><Text>Nothing planned to do!</Text></View>
        )}
        theme={{
          agendaTodayColor: COLORS.red,
          agendaKnobColor: COLORS.red,
          selectedDayBackgroundColor: COLORS.red,
          dotColor: COLORS.red,
          todayTextColor: COLORS.red,
        }}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('EntryForm', { selectedDate })}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: TAB_BAR_HEIGHT,
  },
  itemContainer: {
    marginBottom: 10,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minHeight: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    color: COLORS.black,
    fontSize: 16,
    marginBottom: 5,
  },
  timeText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  detailButton: {
    backgroundColor: COLORS.red,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  detailButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  addButton: {
    position: 'absolute',
    bottom: TAB_BAR_HEIGHT + 20,
    right: 20,
    backgroundColor: COLORS.red,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    lineHeight: 30,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Calendar;