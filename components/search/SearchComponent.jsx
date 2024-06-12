import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { COLORS } from '../../constants/theme';

const SearchComponent = ({ onSearch, placeholder, onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = async () => {
    if (onSearch) {
      const searchResults = await onSearch(query);
      setResults(searchResults || []);
    }
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setQuery(item.name);
    setResults([]);
  };

  const handleAddToEntry = () => {
    onSelect(selectedItem);
    setSelectedItem(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <View style={styles.container}>
          <TextInput
            placeholder={placeholder || "Search here..."}
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        {results.length > 0 && (
          <FlatList
            data={results}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)} style={styles.resultItem}>
                <Text style={styles.resultText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={styles.resultsList}
            contentContainerStyle={styles.resultsListContainer}
          />
        )}
        {selectedItem && (
          <TouchableOpacity onPress={handleAddToEntry} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add this to your entry</Text>
          </TouchableOpacity>
        )}
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
  resultsList: {
    marginHorizontal: 10,
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    maxHeight: 200,
  },
  resultsListContainer: {
    paddingBottom: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultText: {
    color: COLORS.black,
  },
  addButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: COLORS.green,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SearchComponent;
