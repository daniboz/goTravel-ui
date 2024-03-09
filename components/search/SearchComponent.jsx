import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchComponent = () => {
  const navigation = useNavigation();

  // Function to handle the search action
  const handleSearch = () => {
    // Here, you might want to navigate to a search results screen
    // For example: navigation.navigate('SearchResults', { query: 'your query here' });
    console.log('Search action triggered');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <TextInput
        placeholder="Search here..."
        style={styles.input}
        // You can add more props to handle the search text, such as onChangeText
      />
      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default SearchComponent;
