import React, { useState, useEffect, useRef} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { startOfWeek, addDays, format} from 'date-fns';
import { COLORS, TAB_BAR_HEIGHT } from '../../constants/theme';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const getWeekStart = (date) => startOfWeek(date, { weekStartsOn: 1 });

const getWeekDays = (startOfWeek) => [...Array(7)].map((_, i) => addDays(startOfWeek, i));

const isToday = (someDate) => {
  const today = new Date();
  return someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear();
};

const mockAppointments = {
  '09:00': [{ id: 1, title: 'Daily Standup' }],
  '13:00': [{ id: 2, title: 'Lunch with Sarah' }],
  '15:00': [{ id: 3, title: 'Project Meeting' }],
};

const CalendarPage = () => {
  const hoursListRef = useRef();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekDays, setWeekDays] = useState(getWeekDays(getWeekStart(new Date())));

  useEffect(() => {
    const currentHour = new Date().getHours();
    const offset = currentHour * 60; // adjust the multiplier based on your hour row height
    hoursListRef.current?.scrollTo({ y: offset, animated: true });
  }, []);

  useEffect(() => {
    setWeekDays(getWeekDays(getWeekStart(selectedDate)));
  }, [selectedDate]);

  const selectDate = (date) => {
    setSelectedDate(date);
    setWeekDays(getWeekDays(getWeekStart(date)));
  };

  const changeWeek = (direction) => {
    const newSelectedDate = addDays(selectedDate, direction * 7);
    selectDate(newSelectedDate);
  };

  const renderHourRow = (hour, appointments) => {
    const hasAppointments = appointments && appointments.length > 0;
    return (
      <View key={hour} style={hasAppointments ? styles.hourRowHighlighted : styles.hourRow}>
        <Text style={hasAppointments ? styles.hourTextHighlighted : styles.hourText}>{hour}</Text>
        {hasAppointments && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {appointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentContainer}>
                <Text style={styles.appointmentText}>{appointment.title}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  };

  const headerHeight = 50;
  const availableHeight = screenHeight - headerHeight - TAB_BAR_HEIGHT;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { height: headerHeight }]}>
        <TouchableOpacity onPress={() => changeWeek(-1)}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {format(selectedDate, 'MMMM yyyy')}
        </Text>
        <TouchableOpacity onPress={() => changeWeek(1)}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weekDaysContainer}
      >
        {weekDays.map((day, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.dayButton,
              isToday(day) ? styles.todayButton : {}
            ]} 
            onPress={() => selectDate(day)}
          >
            <Text style={styles.dayText}>
              {format(day, 'EEE d')}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView
        ref={hoursListRef}
        style={styles.hoursList}
      >
        {Array.from({ length: 24 }, (_, index) => {
          const hourString = `${index < 10 ? '0' : ''}${index}:00`;
          return renderHourRow(hourString, mockAppointments[hourString]);
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    hoursList: {
      marginBottom: TAB_BAR_HEIGHT -5,
    },
    header: {
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#f2f2f2',
      paddingHorizontal: 10,
    },
    arrowText: {
      fontSize: 24,
      color: '#333',
    },
    monthText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
    weekDaysContainer: {
      flexGrow: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 5, 
    },
    dayButton: {
      width: screenWidth / 7 - 10, 
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 2, 
      backgroundColor: '#eaeaea', 
      paddingVertical: 5, 
      borderRadius: 5, 
    },
    dayText: {
      fontSize: 14, 
    },
    hourRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      opacity: 0.3,
    },
    hourRowHighlighted: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      opacity: 1, 
      backgroundColor: '#f0f8ff', 
    },
    hourText: {
      fontSize: 16,
    },
    hourTextHighlighted: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    appointmentContainer: {
      backgroundColor: COLORS.red,
      borderRadius: 5,
      padding: 5,
      marginRight: 10,
    },
    appointmentText: {
      color: '#fff',
    },
    todayButton: {
      backgroundColor: COLORS.red,
      borderRadius: 10,
    },
  });

export default CalendarPage;
