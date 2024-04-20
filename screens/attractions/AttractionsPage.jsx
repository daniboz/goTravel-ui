import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import SearchComponent from '../../components/search/SearchComponent'; // Assuming this is already styled to match the Home page
import ForumActionButton from '../../components/forum/ForumActionButton';
import { TAB_BAR_HEIGHT, COLORS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const AttractionsPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [selectedCity, setSelectedCity] = useState('New York');

  // Dummy data for attractions
  const attractions = [
    { id: 1, name: "Statue of Liberty", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Statue_of_Liberty%2C_NY.jpg" },
    { id: 2, name: "Eiffel Tower", imageUrl: "https://th.bing.com/th/id/OIP.AW_3WtO4mpBHZSZBQ9OQ9QHaE8?rs=1&pid=ImgDetMain" },
    { id: 3, name: "Great Wall of China", imageUrl: "https://th.bing.com/th/id/OIP.XIP8n-FUuutxiV7G3s33xAHaEK?rs=1&pid=ImgDetMain" },
    { id: 4, name: "Taj Mahal", imageUrl: "https://th.bing.com/th/id/OIP.gUlxaGCTm1180mEfjLnbOgHaEQ?rs=1&pid=ImgDetMain" },
    { id: 5, name: "Machu Picchu", imageUrl: "https://th.bing.com/th/id/R.85a17e0b6b26a5edf858be3f0dcaed57?rik=TO2ae5aBd3BkmA&riu=http%3a%2f%2fwww.destination360.com%2fcontents%2fpictures%2fsouth-america%2fperu%2fmachu-picchu.jpg&ehk=CRBVkEg5C4m%2b9D06kckOpVknNQo8ZcY6Cl7T0Qzsu5s%3d&risl=&pid=ImgRaw&r=0" },
    { id: 6, name: "Colosseum", imageUrl: "https://th.bing.com/th/id/OIP.-X2XZs7QYgzjhkZP_Fq4sAHaEo?w=297&h=186&c=7&r=0&o=5&pid=1.7" },
    { id: 7, name: "Sydney Opera House", imageUrl: "https://th.bing.com/th/id/OIP.8WXqr4q0sWA9fBhUGVYXtAHaEK?pid=ImgDet&rs=1" }
];


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchComponent />
        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.filterButtonText}>Filter</Text>
          <Ionicons name="options-outline" size={24} color="black" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
        <ScrollView style={styles.attractionsList}>
          {attractions.map((attraction, index) => (
            <View key={index} style={styles.attractionCard}>
              <Image source={{ uri: attraction.imageUrl }} style={styles.image} />
              <Text style={styles.imageText}>{attraction.name}</Text>
            </View>
          ))}
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Picker
                selectedValue={selectedCountry}
                onValueChange={(itemValue, itemIndex) => setSelectedCountry(itemValue)}
                style={{ width: 200, height: 180 }}
              >
                <Picker.Item label="USA" value="USA" />
                <Picker.Item label="France" value="France" />
                {/* More countries can be added here */}
              </Picker>
              <Picker
                selectedValue={selectedCity}
                onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
                style={{ width: 200, height: 180 }}
              >
                <Picker.Item label="New York" value="New York" />
                <Picker.Item label="Paris" value="Paris" />
                {/* More cities can be added here */}
              </Picker>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => {
                    console.log("Confirming selection: ", selectedCountry, selectedCity);
                    setModalVisible(false);  // Optionally perform the search/filter action here
                  }}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <ForumActionButton />
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
  },
  filterButton: {
    flexDirection: 'row', // Ensure the button contents are laid out in a row
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 5,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center', // Align items vertically in the center
  },
  filterButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,  // Adjusted for better visibility
  },
  attractionsList: {
    marginTop: 10,
    marginBottom: TAB_BAR_HEIGHT ,
  },
  scrollViewContent: {
    paddingBottom: 50, // Adjust this value based on the height of your bottom tab navigator
  },
  attractionCard: {
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  imageText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: COLORS.red,
    marginRight: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  closeButton: {
    backgroundColor: 'grey',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default AttractionsPage;
