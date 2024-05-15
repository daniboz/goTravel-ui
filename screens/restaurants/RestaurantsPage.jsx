import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchComponent from '../../components/search/SearchComponent';
import ForumActionButton from '../../components/forum/ForumActionButton';
import { TAB_BAR_HEIGHT, COLORS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RestaurantsPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [selectedCity, setSelectedCity] = useState('New York');

  // Dummy data for restaurants
  const restaurants = [
    {
      id: 1,
      name: "Joe's Pizza",
      imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGRpbmluZ3xlbnwwfHx8fDE2ODM3MDYwMjc&ixlib=rb-1.2.1&q=80&w=1080",
      description: "Famous pizzeria serving classic New York-style pizza since 1975.",
      coordinates: { latitude: 40.730610, longitude: -73.935242 },
      rating: 5,
      location: { city: "New York", country: "USA" },
      reviewCount: 320,
      hours: "11:00 AM - 11:00 PM",
      reviews: [
        {
          id: 1,
          user: {
            username: 'PizzaLover',
            profile: 'https://randomuser.me/api/portraits/men/10.jpg'
          },
          rating: 5,
          review: 'The best pizza in New York! A must-try.',
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          user: {
            username: 'Foodie',
            profile: 'https://randomuser.me/api/portraits/women/10.jpg'
          },
          rating: 5,
          review: 'Absolutely delicious, the crust is perfect!',
          updatedAt: new Date().toISOString()
        }
      ]
    },
    {
      id: 2,
      name: "Le Jules Verne",
      imageUrl: "https://images.unsplash.com/photo-1543353071-873f17a7a088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fGRpbmluZ3xlbnwwfHx8fDE2ODM3MDU5OTM&ixlib=rb-1.2.1&q=80&w=1080",
      description: "Gourmet restaurant located in the Eiffel Tower, Paris.",
      coordinates: { latitude: 48.8584, longitude: 2.2945 },
      rating: 5,
      location: { city: "Paris", country: "France" },
      reviewCount: 150,
      hours: "12:00 PM - 10:00 PM",
      reviews: [
        {
          id: 1,
          user: {
            username: 'GourmetParis',
            profile: 'https://randomuser.me/api/portraits/men/20.jpg'
          },
          rating: 5,
          review: 'Exquisite dining experience with a view!',
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          user: {
            username: 'CuisineLover',
            profile: 'https://randomuser.me/api/portraits/women/20.jpg'
          },
          rating: 4,
          review: 'Amazing food, but a bit pricey.',
          updatedAt: new Date().toISOString()
        }
      ]
    },
    {
      id: 3,
      name: "Peking Duck House",
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGR1Y2slMjBob3VzZXxlbnwwfHx8fDE2ODM3MDYwMDU&ixlib=rb-1.2.1&q=80&w=1080",
      description: "Authentic Peking duck served in a traditional setting.",
      coordinates: { latitude: 39.9042, longitude: 116.4074 },
      rating: 4,
      location: { city: "Beijing", country: "China" },
      reviewCount: 220,
      hours: "10:00 AM - 10:00 PM",
      reviews: [
        {
          id: 1,
          user: {
            username: 'DuckLover',
            profile: 'https://randomuser.me/api/portraits/men/30.jpg'
          },
          rating: 4,
          review: 'Delicious Peking duck, a must-try!',
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          user: {
            username: 'FoodExplorer',
            profile: 'https://randomuser.me/api/portraits/women/30.jpg'
          },
          rating: 4,
          review: 'Great experience, but the service could be better.',
          updatedAt: new Date().toISOString()
        }
      ]
    },
    {
      id: 4,
      name: "Karim's",
      imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGlkaWFuJTIwZm9vZHxlbnwwfHx8fDE2ODM3MDYwMTY&ixlib=rb-1.2.1&q=80&w=1080",
      description: "Legendary Mughlai restaurant in Old Delhi, India.",
      coordinates: { latitude: 28.6562, longitude: 77.2410 },
      rating: 5,
      location: { city: "Delhi", country: "India" },
      reviewCount: 320,
      hours: "12:00 PM - 11:00 PM",
      reviews: [
        {
          id: 1,
          user: {
            username: 'SpiceLover',
            profile: 'https://randomuser.me/api/portraits/men/15.jpg'
          },
          rating: 5,
          review: 'Authentic and flavorful Mughlai dishes!',
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          user: {
            username: 'CultureEater',
            profile: 'https://randomuser.me/api/portraits/women/15.jpg'
          },
          rating: 5,
          review: 'Rich flavors and a cultural experience.',
          updatedAt: new Date().toISOString()
        }
      ]
    },
    {
      id: 5,
      name: "Central Restaurante",
      imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fGRpbmluZ3xlbnwwfHx8fDE2ODM3MDYwMjA&ixlib=rb-1.2.1&q=80&w=1080",
      description: "Contemporary Peruvian cuisine by chef Virgilio Martínez.",
      coordinates: { latitude: -12.0464, longitude: -77.0428 },
      rating: 5,
      location: { city: "Lima", country: "Peru" },
      reviewCount: 540,
      hours: "1:00 PM - 10:00 PM",
      reviews: [
        {
          id: 1,
          user: {
            username: 'PeruFoodie',
            profile: 'https://randomuser.me/api/portraits/men/40.jpg'
          },
          rating: 5,
          review: 'Innovative dishes with local ingredients.',
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          user: {
            username: 'AdventureEater',
            profile: 'https://randomuser.me/api/portraits/women/40.jpg'
          },
          rating: 5,
          review: 'A culinary adventure in every bite.',
          updatedAt: new Date().toISOString()
        }
      ]
    },
    {
      id: 6,
      name: "La Pergola",
      imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGRpbmluZ3xlbnwwfHx8fDE2ODM3MDYwMjc&ixlib=rb-1.2.1&q=80&w=1080",
      description: "Fine dining with panoramic views of Rome.",
      coordinates: { latitude: 41.9038, longitude: 12.4950 },
      rating: 5,
      location: { city: "Rome", country: "Italy" },
      reviewCount: 250,
      hours: "12:00 PM - 11:00 PM",
      reviews: [
        {
          id: 1,
          user: {
            username: 'RomeGourmet',
            profile: 'https://randomuser.me/api/portraits/men/50.jpg'
          },
          rating: 5,
          review: 'Elegant dining with breathtaking views.',
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          user: {
            username: 'FineDiner',
            profile: 'https://randomuser.me/api/portraits/women/50.jpg'
          },
          rating: 5,
          review: 'A luxurious experience from start to finish.',
          updatedAt: new Date().toISOString()
        }
      ]
    },
    {
      id: 7,
      name: "Quay",
      imageUrl: "https://images.unsplash.com/photo-1533777324565-a040eb52fac2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGRpbmluZ3xlbnwwfHx8fDE2ODM3MDYwMzE&ixlib=rb-1.2.1&q=80&w=1080",
      description: "Modern Australian cuisine with stunning harbor views.",
      coordinates: { latitude: -33.8568, longitude: 151.2153 },
      rating: 5,
      location: { city: "Sydney", country: "Australia" },
      reviewCount: 480,
      hours: "11:00 AM - 10:00 PM",
      reviews: [
        {
          id: 1,
          user: {
            username: 'SydneyFoodie',
            profile: 'https://randomuser.me/api/portraits/men/60.jpg'
          },
          rating: 5,
          review: 'Creative dishes with a beautiful presentation.',
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          user: {
            username: 'HarborDiner',
            profile: 'https://randomuser.me/api/portraits/women/60.jpg'
          },
          rating: 5,
          review: 'A perfect blend of flavors and scenery.',
          updatedAt: new Date().toISOString()
        }
      ]
    }
  ];

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchComponent />
        <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('RestaurantsFilter')}>
          <Text style={styles.filterButtonText}>Filter</Text>
          <Ionicons name="options-outline" size={24} color="black" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
        <ScrollView style={styles.restaurantsList}>
          {restaurants.map((restaurant, index) => (
            <TouchableOpacity
              key={index}
              style={styles.restaurantCard}
              onPress={() => navigation.navigate('RestaurantDetails', { restaurant })}
            >
              <Image source={{ uri: restaurant.imageUrl }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.imageText}>{restaurant.name}</Text>
                <Text style={styles.hoursText}>{restaurant.hours}</Text>
              </View>
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
  restaurantsList: {
    marginTop: 10,
    marginBottom: TAB_BAR_HEIGHT,
  },
  scrollViewContent: {
    paddingBottom: 50, 
  },
  restaurantCard: {
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
  textContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  imageText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hoursText: {
    color: 'gray',
    fontSize: 14,
    marginTop: 5,
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

export default RestaurantsPage;
