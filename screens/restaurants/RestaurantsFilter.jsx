import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const RestaurantsFilter = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedDietaryOptions, setSelectedDietaryOptions] = useState([]);
  const [expandedType, setExpandedType] = useState(false);
  const [expandedRating, setExpandedRating] = useState(false);
  const [expandedPriceRange, setExpandedPriceRange] = useState(false);
  const [expandedDietaryOptions, setExpandedDietaryOptions] = useState(false);

  const typesOfRestaurants = [
    { id: 'Italian', name: 'Italian' },
    { id: 'Chinese', name: 'Chinese' },
    { id: 'Indian', name: 'Indian' },
    { id: 'Mexican', name: 'Mexican' },
    { id: 'Japanese', name: 'Japanese' },
    { id: 'American', name: 'American' },
    { id: 'Thai', name: 'Thai' }
  ];

  const ratings = ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"];
  const priceRanges = ["$", "$$", "$$$", "$$$$"];
  const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Halal"];

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
    console.log('Selected Price Ranges:', selectedPriceRange);
    console.log('Selected Dietary Options:', selectedDietaryOptions);
    // navigation.goBack(); 
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedRating([]);
    setSelectedPriceRange([]);
    setSelectedDietaryOptions([]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Filters</Text>
        
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.label}>Type of Cuisine:</Text>
          <View style={styles.spaceBelowLabel}/>
          {expandedType ? typesOfRestaurants.map((type) => (
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

          <Text style={styles.label}>Price Range:</Text>
          {expandedPriceRange ? priceRanges.map(priceRange => (
            <TouchableOpacity
              key={priceRange}
              style={[styles.option, selectedPriceRange.includes(priceRange) ? styles.selectedOption : styles.unselectedOption]}
              onPress={() => handleSelect(priceRange, selectedPriceRange, setSelectedPriceRange)}>
              <Text style={styles.optionText}>{priceRange}</Text>
            </TouchableOpacity>
          )) : priceRanges.slice(0, 3).map(priceRange => (
            <TouchableOpacity
              key={priceRange}
              style={[styles.option, selectedPriceRange.includes(priceRange) ? styles.selectedOption : styles.unselectedOption]}
              onPress={() => handleSelect(priceRange, selectedPriceRange, setSelectedPriceRange)}>
              <Text style={styles.optionText}>{priceRange}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setExpandedPriceRange(!expandedPriceRange)} style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>{expandedPriceRange ? "View Less" : "View More"}</Text>
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

export default RestaurantsFilter;
