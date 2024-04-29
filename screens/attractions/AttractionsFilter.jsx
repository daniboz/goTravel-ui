import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import { COLORS } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const AttractionsFilter = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState([]);
  const [selectedSuitability, setSelectedSuitability] = useState([]);
  const [expandedType, setExpandedType] = useState(false);
  const [expandedRating, setExpandedRating] = useState(false);
  const [expandedDuration, setExpandedDuration] = useState(false);
  const [expandedSuitability, setExpandedSuitability] = useState(false);

  const typesOfAttractions = [
    { id: 'Sights', name: 'Sights' },
    { id: 'Museums', name: 'Museums' },
    { id: 'Fun', name: 'Fun' },
    { id: 'Spas', name: 'Spas' },
    { id: 'Nightlife', name: 'Nightlife' },
    { id: 'Zoos', name: 'Zoos' },
    { id: 'Amusement Parks', name: 'Amusement Parks' }
  ];

  const ratings = ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"];
  const durations = ["<1hr", "1-3hr", ">3h"];
  const suitabilities = ["Rainy Day", "Date Night", "Free Entry", "Families"];

  const handleSelect = (item, list, setList) => {
    const currentIndex = list.indexOf(item);
    const newSelected = [...list];

    if (currentIndex === -1) {
      newSelected.push(item);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setList(newSelected);
  };

  const applyFilters = () => {
    console.log('Selected Types:', selectedTypes);
    console.log('Selected Ratings:', selectedRating);
    console.log('Selected Durations:', selectedDuration);
    console.log('Selected Suitability:', selectedSuitability);
    // navigation.goBack(); 
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedRating([]);
    setSelectedDuration([]);
    setSelectedSuitability([]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Filters</Text>
        
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.label}>Type of Attraction:</Text>
          <View style={styles.spaceBelowLabel}/>
          {expandedType ? typesOfAttractions.map((type) => (
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
          <TouchableOpacity onPress={() => setExpandedType(!expandedType)} style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>{expandedType ? "View Less" : "View More"}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Ratings:</Text>
          {expandedRating ? ratings.map(rating => (
            <TouchableOpacity
              key={rating}
              style={[styles.option, selectedRating.includes(rating) ? styles.selectedOption : styles.unselectedOption]}
              onPress={() => handleSelect(rating, selectedRating, setSelectedRating)}>
              <Text style={styles.optionText}>{rating}</Text>
            </TouchableOpacity>
          )) : ratings.slice(0, 3).map(rating => (
            <TouchableOpacity
              key={rating}
              style={[styles.option, selectedRating.includes(rating) ? styles.selectedOption : styles.unselectedOption]}
              onPress={() => handleSelect(rating, selectedRating, setSelectedRating)}>
              <Text style={styles.optionText}>{rating}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setExpandedRating(!expandedRating)} style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>{expandedRating ? "View Less" : "View More"}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Perfect For:</Text>
          {expandedSuitability ? suitabilities.map(suitability => (
            <TouchableOpacity
              key={suitability}
              style={[styles.option, selectedSuitability.includes(suitability) ? styles.selectedOption : styles.unselectedOption]}
              onPress={() => handleSelect(suitability, selectedSuitability, setSelectedSuitability)}>
              <Text style={styles.optionText}>{suitability}</Text>
            </TouchableOpacity>
          )) : suitabilities.slice(0, 3).map(suitability => (
            <TouchableOpacity
              key={suitability}
              style={[styles.option, selectedSuitability.includes(suitability) ? styles.selectedOption : styles.unselectedOption]}
              onPress={() => handleSelect(suitability, selectedSuitability, setSelectedSuitability)}>
              <Text style={styles.optionText}>{suitability}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setExpandedSuitability(!expandedSuitability)} style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>{expandedSuitability ? "View Less" : "View More"}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Duration:</Text>
          {expandedDuration ? durations.map(duration => (
            <TouchableOpacity
              key={duration}
              style={[styles.option, selectedDuration.includes(duration) ? styles.selectedOption : styles.unselectedOption]}
              onPress={() => handleSelect(duration, selectedDuration, setSelectedDuration)}>
              <Text style={styles.optionText}>{duration}</Text>
            </TouchableOpacity>
          )) : durations.slice(0, 3).map(duration => (
            <TouchableOpacity
              key={duration}
              style={[styles.option, selectedDuration.includes(duration) ? styles.selectedOption : styles.unselectedOption]}
              onPress={() => handleSelect(duration, selectedDuration, setSelectedDuration)}>
              <Text style={styles.optionText}>{duration}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.buttonText}>Clear Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.buttonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 10,
  },
  spaceBelowLabel: {
    marginBottom: 20,
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
    borderColor: COLORS.primary,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  applyButton: {
    backgroundColor: COLORS.red,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  clearButton: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AttractionsFilter;


