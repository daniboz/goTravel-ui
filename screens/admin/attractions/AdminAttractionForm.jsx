import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Text, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/theme';
import {BASE_URL} from '../../../constants/config'

const typesOfAttractions = [
  { id: 'Sights', name: 'Sights' },
  { id: 'Museums', name: 'Museums' },
  { id: 'Fun', name: 'Fun' },
  { id: 'Spas', name: 'Spas' },
  { id: 'Nightlife', name: 'Nightlife' },
  { id: 'Zoos', name: 'Zoos' },
  { id: 'Amusement Parks', name: 'Amusement Parks' }
];

const durations = ["<1hr", "1-3hr", ">3hr"];
const suitabilities = ["Rainy Day", "Date Night", "Free Entry", "Families"];

const AdminAttractionForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [locationCountry, setLocationCountry] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedSuitabilities, setSelectedSuitabilities] = useState([]);
  const [expandedTypes, setExpandedTypes] = useState(false);
  const [expandedSuitabilities, setExpandedSuitabilities] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params || {};

  useEffect(() => {
    if (id) {
      fetchAttractionDetails();
    }
  }, [id]);

  const fetchAttractionDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/attractions/${id}`);
      const { name, description, hours, location, coordinates, imageUrl, types, duration, suitability } = response.data;
      setName(name);
      setDescription(description);
      setHours(hours);
      setLocationCity(location.city);
      setLocationCountry(location.country);
      setLatitude(coordinates.latitude.toString());
      setLongitude(coordinates.longitude.toString());
      setImageUrl(imageUrl);
      setSelectedTypes(types);
      setSelectedDuration(duration);
      setSelectedSuitabilities(suitability);
    } catch (error) {
      console.error('Error fetching attraction details:', error);
    }
  };

  const handleSelect = (item, list, setList, singleSelect = false) => {
    if (singleSelect) {
      setList(item === list ? '' : item);
    } else {
      const currentIndex = list.indexOf(item);
      const newSelected = [...list];

      if (currentIndex === -1) {
        newSelected.push(item);
      } else {
        newSelected.splice(currentIndex, 1);
      }

      setList(newSelected);
    }
  };

  const handleSubmit = async () => {
    if (!name || !description || !hours || !locationCity || !locationCountry || !latitude || !longitude || !imageUrl || !selectedDuration) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const attractionData = {
      name,
      description,
      hours,
      location: { city: locationCity, country: locationCountry },
      coordinates: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
      imageUrl,
      types: selectedTypes,
      duration: selectedDuration,
      suitability: selectedSuitabilities
    };

    try {
      if (id) {
        await axios.put(`${BASE_URL}/api/attractions/${id}`, attractionData);
        setConfirmationMessage(`${name} was updated successfully!`);
      } else {
        await axios.post(`${BASE_URL}/api/attractions`, attractionData);
        setConfirmationMessage(`${name} was added successfully!`);
      }
      setConfirmationVisible(true);
    } catch (error) {
      console.error('Error saving attraction:', error.response ? error.response.data : error.message);
      Alert.alert('Error', error.response ? error.response.data.error : error.message);
    }
  };

  const handleConfirmation = () => {
    setConfirmationVisible(false);
    navigation.navigate('AdminAttractionsPage', { refresh: true });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Name*"
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Description*"
              value={description}
              onChangeText={setDescription}
              multiline
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Hours*"
              value={hours}
              onChangeText={setHours}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Location City*"
              value={locationCity}
              onChangeText={setLocationCity}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Location Country*"
              value={locationCountry}
              onChangeText={setLocationCountry}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Latitude*"
              value={latitude}
              onChangeText={setLatitude}
              keyboardType="numeric"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Longitude*"
              value={longitude}
              onChangeText={setLongitude}
              keyboardType="numeric"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL*"
              value={imageUrl}
              onChangeText={setImageUrl}
              autoCapitalize="none"
            />
            <Text style={styles.label}>Types of Attractions:</Text>
            {expandedTypes ? typesOfAttractions.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[styles.option, selectedTypes.includes(type.id) ? styles.selectedOption : styles.unselectedOption]}
                onPress={() => handleSelect(type.id, selectedTypes, setSelectedTypes)}>
                <Text style={styles.optionText}>{type.name}</Text>
              </TouchableOpacity>
            )) : typesOfAttractions.slice(0, 3).map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[styles.option, selectedTypes.includes(type.id) ? styles.selectedOption : styles.unselectedOption]}
                onPress={() => handleSelect(type.id, selectedTypes, setSelectedTypes)}>
                <Text style={styles.optionText}>{type.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setExpandedTypes(!expandedTypes)} style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>{expandedTypes ? "View Less" : "View More"}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Suitabilities:</Text>
            {expandedSuitabilities ? suitabilities.map(option => (
              <TouchableOpacity
                key={option}
                style={[styles.option, selectedSuitabilities.includes(option) ? styles.selectedOption : styles.unselectedOption]}
                onPress={() => handleSelect(option, selectedSuitabilities, setSelectedSuitabilities)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            )) : suitabilities.slice(0, 3).map(option => (
              <TouchableOpacity
                key={option}
                style={[styles.option, selectedSuitabilities.includes(option) ? styles.selectedOption : styles.unselectedOption]}
                onPress={() => handleSelect(option, selectedSuitabilities, setSelectedSuitabilities)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setExpandedSuitabilities(!expandedSuitabilities)} style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>{expandedSuitabilities ? "View Less" : "View More"}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Duration*:</Text>
            {durations.map(duration => (
              <TouchableOpacity
                key={duration}
                style={[styles.option, selectedDuration === duration ? styles.selectedOption : styles.unselectedOption]}
                onPress={() => handleSelect(duration, selectedDuration, setSelectedDuration, true)}
              >
                <Text style={styles.optionText}>{duration}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        {confirmationVisible && (
          <View style={styles.confirmationPopup}>
            <Text style={styles.confirmationText}>{confirmationMessage}</Text>
            <TouchableOpacity onPress={handleConfirmation} style={styles.okButton}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  unselectedOption: {
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  selectedOption: {
    borderColor: '#000',
  },
  optionText: {
    fontSize: 16,
  },
  viewMoreButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  viewMoreText: {
    color: COLORS.green,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: COLORS.green,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmationPopup: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -75 }],
    width: 200,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  confirmationText: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: COLORS.green,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminAttractionForm;
