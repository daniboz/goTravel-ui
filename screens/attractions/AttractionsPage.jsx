import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchComponent from '../../components/search/SearchComponent';
import ForumActionButton from '../../components/forum/ForumActionButton';
import { TAB_BAR_HEIGHT, COLORS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AttractionsPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [selectedCity, setSelectedCity] = useState('New York');

  // Dummy data for attractions
  const attractions = [
    {
      id: 1,
      name: "Statue of Liberty",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Statue_of_Liberty%2C_NY.jpg",
      description: "The Statue of Liberty, a colossal neoclassical sculpture on Liberty Island in New York Harbor, was designed by Frédéric Auguste Bartholdi and dedicated on October 28, 1886. The statue is a gift from the people of France and has become a universal symbol of freedom and democracy. It represents Libertas, the Roman liberty goddess. It holds a torch above her head with her right hand, and in her left hand carries a tabula ansata inscribed with the date of the American Declaration of Independence, July 4, 1776.",
      coordinates: { latitude: 40.6892, longitude: -74.0445 },
      rating: 5,
      location: { city: "New York", country: "USA" },
      reviewCount: 320,
      reviews: [
        {
          id: 1,
          user: {
            username: 'NYCLover',
            profile: 'https://randomuser.me/api/portraits/men/10.jpg'
          },
          rating: 5,
          review: 'An iconic symbol of freedom! The Statue of Liberty stands as a beautiful reminder of our liberty. The view from the crown is breathtaking and well worth the climb.',
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          user: {
            username: 'HistoryBuff',
            profile: 'https://randomuser.me/api/portraits/women/10.jpg'
          },
          rating: 5,
          review: 'Absolutely breathtaking, steeped in so much history. The ferry ride to the island was lovely, and the museum provides a rich context to her story and significance.',
          updatedAt: new Date().toISOString()
        },
        {
          id: 3,
          user: {
            username: 'LibertyFan',
            profile: 'https://randomuser.me/api/portraits/men/25.jpg'
          },
          rating: 5,
          review: 'Amazing visit! Make sure to grab an audio tour for an enriching experience. The statue is inspiring with detailed historical exhibits inside.',
          updatedAt: new Date().toISOString()
        },
        {
          id: 4,
          user: {
            username: 'Traveler4',
            profile: 'https://randomuser.me/api/portraits/women/26.jpg'
          },
          rating: 5,
          review: 'The symbol of freedom and American independence. A must-see for everyone visiting New York. I recommend going early to avoid the crowds.',
          updatedAt: new Date().toISOString()
        }
      ]
  },
    {
        id: 2,
        name: "Eiffel Tower",
        imageUrl: "https://th.bing.com/th/id/OIP.AW_3WtO4mpBHZSZBQ9OQ9QHaE8?rs=1&pid=ImgDetMain",
        description: "A wrought-iron lattice tower on the Champ de Mars in Paris, France.",
        coordinates: { latitude: 48.8584, longitude: 2.2945 },
        rating: 5,
        location: { city: "Paris", country: "France" },
        reviewCount: 1050,
        reviews: [
          {
            id: 1,
            user: {
              username: 'ParisianDreamer',
              profile: 'https://randomuser.me/api/portraits/men/20.jpg'
            },
            rating: 5,
            review: 'Stunning views at night, a must-see!',
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            user: {
              username: 'ArtLover',
              profile: 'https://randomuser.me/api/portraits/women/20.jpg'
            },
            rating: 4,
            review: 'The tower is marvelous, especially the ironwork details!',
            updatedAt: new Date().toISOString()
          }
        ]
    },
    {
        id: 3,
        name: "Great Wall of China",
        imageUrl: "https://th.bing.com/th/id/OIP.XIP8n-FUuutxiV7G3s33xAHaEK?rs=1&pid=ImgDetMain",
        description: "A series of fortifications made of stone, brick, tamped earth, wood, and other materials.",
        coordinates: { latitude: 40.4319, longitude: 116.5704 },
        rating: 4,
        location: { city: "Beijing", country: "China" },
        reviewCount: 840,
        reviews: [
          {
            id: 1,
            user: {
              username: 'TravelerBeijing',
              profile: 'https://randomuser.me/api/portraits/men/30.jpg'
            },
            rating: 4,
            review: 'Incredible historical monument, a true masterpiece.',
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            user: {
              username: 'Adventurer',
              profile: 'https://randomuser.me/api/portraits/women/30.jpg'
            },
            rating: 4,
            review: 'A bit crowded, but the views and history are worth it.',
            updatedAt: new Date().toISOString()
          }
        ]
    },
    {
        id: 4,
        name: "Taj Mahal",
        imageUrl: "https://th.bing.com/th/id/OIP.gUlxaGCTm1180mEfjLnbOgHaEQ?rs=1&pid=ImgDetMain",
        description: "An ivory-white marble mausoleum on the south bank of the Yamuna river in Agra, India.",
        coordinates: { latitude: 27.1751, longitude: 78.0421 },
        rating: 5,
        location: { city: "Agra", country: "India" },
        reviewCount: 932 
    },
    {
        id: 5,
        name: "Machu Picchu",
        imageUrl: "https://th.bing.com/th/id/R.85a17e0b6b26a5edf858be3f0dcaed57?rik=TO2ae5aBd3BkmA&riu=http%3a%2f%2fwww.destination360.com%2fcontents%2fpictures%2fsouth-america%2fperu%2fmachu-picchu.jpg&ehk=CRBVkEg5C4m%2b9D06kckOpVknNQo8ZcY6Cl7T0Qzsu5s%3d&risl=&pid=ImgRaw&r=0",
        description: "An Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley.",
        coordinates: { latitude: -13.1631, longitude: -72.5450},
        rating: 4,
        location: { city: "Cusco", country: "Peru" },
        reviewCount: 765 
    },
    {
        id: 6,
        name: "Colosseum",
        imageUrl: "https://th.bing.com/th/id/OIP.-X2XZs7QYgzjhkZP_Fq4sAHaEo?w=297&h=186&c=7&r=0&o=5&pid=1.7",
        description: "An oval amphitheatre in the centre of the city of Rome, Italy.",
        coordinates: { latitude: 41.8902, longitude: 12.4922 },
        rating: 5,
        location: { city: "Rome", country: "Italy" },
        reviewCount: 1543 
    },
    {
        id: 7,
        name: "Sydney Opera House",
        imageUrl: "https://th.bing.com/th/id/OIP.8WXqr4q0sWA9fBhUGVYXtAHaEK?pid=ImgDet&rs=1",
        description: "A multi-venue performing arts centre at Sydney Harbour in Sydney, New South Wales, Australia.",
        coordinates: { latitude: -33.8568, longitude: 151.2153 },
        rating: 5,
        location: { city: "Sydney", country: "Australia" },
        reviewCount: 486 
    }
];


  

const navigation = useNavigation();


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
            <TouchableOpacity
              key={index}
              style={styles.attractionCard}
              onPress={() => navigation.navigate('AttractionDetail', { attraction })}
            >
              <Image source={{ uri: attraction.imageUrl }} style={styles.image} />
              <Text style={styles.imageText}>{attraction.name}</Text>
            </TouchableOpacity>
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
              </Picker>
              <Picker
                selectedValue={selectedCity}
                onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
                style={{ width: 200, height: 180 }}
              >
                <Picker.Item label="New York" value="New York" />
                <Picker.Item label="Paris" value="Paris" />
              </Picker>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => {
                    console.log("Confirming selection: ", selectedCountry, selectedCity);
                    setModalVisible(false);  
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
    flexDirection: 'row', 
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
    alignItems: 'center', 
  },
  filterButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,  
  },
  attractionsList: {
    marginTop: 10,
    marginBottom: TAB_BAR_HEIGHT ,
  },
  scrollViewContent: {
    paddingBottom: 50, 
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
