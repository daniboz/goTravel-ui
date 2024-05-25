import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/theme';

const typesOfRestaurants = [
  { id: 'Italian', name: 'Italian' },
  { id: 'Chinese', name: 'Chinese' },
  { id: 'Indian', name: 'Indian' },
  { id: 'Mexican', name: 'Mexican' },
  { id: 'Japanese', name: 'Japanese' },
  { id: 'American', name: 'American' },
  { id: 'Thai', name: 'Thai' }
];

const priceRanges = ["$", "$$", "$$$"];
const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Halal"];

const AdminRestaurantForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [locationCountry, setLocationCountry] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedDietaryOptions, setSelectedDietaryOptions] = useState([]);
  const [expandedTypes, setExpandedTypes] = useState(false);
  const [expandedDietaryOptions, setExpandedDietaryOptions] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params || {};

  useEffect(() => {
    if (id) {
      fetchRestaurantDetails();
    }
  }, [id]);

  const fetchRestaurantDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5003/api/restaurants/${id}`);
      const { name, description, hours, location, coordinates, imageUrl, types, priceRange, dietaryOptions } = response.data;
      setName(name);
      setDescription(description);
      setHours(hours);
      setLocationCity(location.city);
      setLocationCountry(location.country);
      setLatitude(coordinates.latitude.toString());
      setLongitude(coordinates.longitude.toString());
      setImageUrl(imageUrl);
      setSelectedTypes(types);
      setSelectedPriceRange(priceRange);
      setSelectedDietaryOptions(dietaryOptions);
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
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
    if (!name || !description || !hours || !locationCity || !locationCountry || !latitude || !longitude || !imageUrl || !selectedPriceRange) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const restaurantData = {
      name,
      description,
      hours,
      location: { city: locationCity, country: locationCountry },
      coordinates: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
      imageUrl,
      types: selectedTypes,
      priceRange: selectedPriceRange,
      dietaryOptions: selectedDietaryOptions
    };

    try {
      if (id) {
        await axios.put(`http://localhost:5003/api/restaurants/${id}`, restaurantData);
        setConfirmationMessage(`${name} was updated successfully!`);
      } else {
        await axios.post('http://localhost:5003/api/restaurants', restaurantData);
        setConfirmationMessage(`${name} was added successfully!`);
      }
      setConfirmationVisible(true);
    } catch (error) {
      console.error('Error saving restaurant:', error.response ? error.response.data : error.message);
      Alert.alert('Error', error.response ? error.response.data.error : error.message);
    }
  };

  const handleConfirmation = () => {
    setConfirmationVisible(false);
    navigation.navigate('AdminRestaurantsPage', { refresh: true });
  };

  return (
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
          <Text style={styles.label}>Types of Cuisine:</Text>
          {expandedTypes ? typesOfRestaurants.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[styles.option, selectedTypes.includes(type.id) ? styles.selectedOption : styles.unselectedOption]}
              onPress={() => handleSelect(type.id, selectedTypes, setSelectedTypes)}>
              <Text style={styles.optionText}>{type.name}</Text>
            </TouchableOpacity>
          )) : typesOfRestaurants.slice(0, 3).map((type) => (
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

          <Text style={styles.label}>Dietary Options:</Text>
          {expandedDietaryOptions ? dietaryOptions.map(option => (
            <TouchableOpacity
              key={option}
              style={[styles.option, selectedDietaryOptions.includes(option) ? styles.selectedOption : styles.unselectedOption]}
              onPress={() => handleSelect(option, selectedDietaryOptions, setSelectedDietaryOptions)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          )) : dietaryOptions.slice(0, 3).map(option => (
            <TouchableOpacity
              key={option}
              style={[styles.option, selectedDietaryOptions.includes(option) ? styles.selectedOption : styles.unselectedOption]}
              onPress={() => handleSelect(option, selectedDietaryOptions, setSelectedDietaryOptions)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setExpandedDietaryOptions(!expandedDietaryOptions)} style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>{expandedDietaryOptions ? "View Less" : "View More"}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Price Range*:</Text>
          {priceRanges.map(priceRange => (
            <TouchableOpacity
              key={priceRange}
              style={[styles.option, selectedPriceRange === priceRange ? styles.selectedOption : styles.unselectedOption]}
              onPress={() => handleSelect(priceRange, selectedPriceRange, setSelectedPriceRange, true)}
            >
              <Text style={styles.optionText}>{priceRange}</Text>
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
    backgroundColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 16,
  },
  viewMoreButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  viewMoreText: {
    color: COLORS.red,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: COLORS.red,
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
    backgroundColor: COLORS.red,
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

export default AdminRestaurantForm;
