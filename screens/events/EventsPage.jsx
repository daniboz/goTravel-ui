import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchComponent from '../../components/search/SearchComponent';
import ForumActionButton from '../../components/forum/ForumActionButton';
import { COLORS, TAB_BAR_HEIGHT } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const EventsPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [selectedCity, setSelectedCity] = useState('New York');

  // Dummy data for events
  const events = [
    {
      id: 1,
      name: "Euro 2024",
      imageUrl: "https://www.bing.com/images/search?view=detailV2&ccid=Wvnh0k1e&id=54279A3002D78FBF7332F4D5FBA3ECB171756AFB&thid=OIP.Wvnh0k1eoy184-0L2in7YQAAAA&mediaurl=https%3a%2f%2ftrthaberstatic.cdn.wp.trt.com.tr%2fresimler%2f1928000%2feuro-2024-depophotos-1928725.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.5af9e1d24d5ea32d7ce3ed0bda29fb61%3frik%3d%252b2p1cbHso%252fvV9A%26pid%3dImgRaw%26r%3d0&exph=266&expw=474&q=euro+2024+pinterest&simid=608051843856337877&FORM=IRPRST&ck=E1BE37D2B905DED5A6278013DB2BF79F&selectedIndex=49&itb=0",
      description: "The 2024 UEFA European Football Championship, commonly referred to as Euro 2024.",
      date: "June 14, 2024",
      coordinates: { latitude: 52.5200, longitude: 13.4050 },
      rating: 5,
      location: { city: "Berlin", country: "Germany" },
      reviewCount: 200,
      reviews: [
        {
          id: 1,
          user: {
            username: 'FootballFan',
            profile: 'https://randomuser.me/api/portraits/men/20.jpg'
          },
          rating: 5,
          review: 'Fantastic atmosphere and great matches!',
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          user: {
            username: 'SoccerLover',
            profile: 'https://randomuser.me/api/portraits/women/20.jpg'
          },
          rating: 5,
          review: 'A must-attend for any football fan!',
          updatedAt: new Date().toISOString()
        }
      ]
    },
    {
      id: 2,
      name: "Untold Festival",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/82/Untold_2019_logo.png",
      description: "Annual electronic music festival held in Cluj-Napoca, Romania.",
      date: "August 1, 2024",
      coordinates: { latitude: 46.770439, longitude: 23.591423 },
      rating: 5,
      location: { city: "Cluj-Napoca", country: "Romania" },
      reviewCount: 300,
      reviews: [
        {
          id: 1,
          user: {
            username: 'MusicLover',
            profile: 'https://randomuser.me/api/portraits/men/30.jpg'
          },
          rating: 5,
          review: 'An unforgettable experience with amazing performances!',
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          user: {
            username: 'FestivalGoer',
            profile: 'https://randomuser.me/api/portraits/women/30.jpg'
          },
          rating: 4,
          review: 'Great vibes and fantastic music!',
          updatedAt: new Date().toISOString()
        }
      ]
    },
    {
      id: 3,
      name: "Enrique Iglesias Concert",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/00/Enrique_Iglesias_2011_4.jpg",
      description: "Live concert by Enrique Iglesias.",
      date: "July 10, 2024",
      coordinates: { latitude: 40.416775, longitude: -3.703790 },
      rating: 5,
      location: { city: "Madrid", country: "Spain" },
      reviewCount: 180,
      reviews: [
        {
          id: 1,
          user: {
            username: 'ConcertLover',
            profile: 'https://randomuser.me/api/portraits/men/40.jpg'
          },
          rating: 5,
          review: 'Enrique was amazing live!',
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          user: {
            username: 'MusicFan',
            profile: 'https://randomuser.me/api/portraits/women/40.jpg'
          },
          rating: 5,
          review: 'One of the best concerts I have ever attended!',
          updatedAt: new Date().toISOString()
        }
      ]
    },
    {
      id: 4,
      name: "Tech Innovators Conference",
      imageUrl: "https://www.publicdomainpictures.net/pictures/320000/velka/technology-background.jpg",
      description: "Annual conference showcasing the latest in tech innovations.",
      date: "September 20, 2024",
      coordinates: { latitude: 37.7749, longitude: -122.4194 },
      rating: 4,
      location: { city: "San Francisco", country: "USA" },
      reviewCount: 120,
      reviews: [
        {
          id: 1,
          user: {
            username: 'TechGuru',
            profile: 'https://randomuser.me/api/portraits/men/50.jpg'
          },
          rating: 4,
          review: 'Very informative and well-organized.',
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          user: {
            username: 'Innovator123',
            profile: 'https://randomuser.me/api/portraits/women/50.jpg'
          },
          rating: 4,
          review: 'Great speakers and interesting topics.',
          updatedAt: new Date().toISOString()
        }
      ]
    },
    {
      id: 5,
      name: "International Film Festival",
      imageUrl: "https://www.publicdomainpictures.net/pictures/30000/velka/film-strip.jpg",
      description: "Annual film festival showcasing the best in international cinema.",
      date: "May 15, 2024",
      coordinates: { latitude: 48.8566, longitude: 2.3522 },
      rating: 5,
      location: { city: "Paris", country: "France" },
      reviewCount: 250,
      reviews: [
        {
          id: 1,
          user: {
            username: 'FilmBuff',
            profile: 'https://randomuser.me/api/portraits/men/60.jpg'
          },
          rating: 5,
          review: 'A cinephile’s paradise with amazing film selections!',
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          user: {
            username: 'MovieLover',
            profile: 'https://randomuser.me/api/portraits/women/60.jpg'
          },
          rating: 5,
          review: 'Incredible films and fantastic atmosphere.',
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
        <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('EventsFilter')}>
          <Text style={styles.filterButtonText}>Filter</Text>
          <Ionicons name="options-outline" size={24} color="black" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
        <ScrollView style={styles.eventsList}>
          {events.map((event, index) => (
            <TouchableOpacity
              key={index}
              style={styles.eventCard}
              onPress={() => navigation.navigate('EventDetails', { event })}
            >
              <Image source={{ uri: event.imageUrl }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.imageText}>{event.name}</Text>
                <Text style={styles.dateText}>{event.date}</Text>
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
  eventsList: {
    marginTop: 10,
    marginBottom: TAB_BAR_HEIGHT,
  },
  scrollViewContent: {
    paddingBottom: 50,
  },
  eventCard: {
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
  dateText: {
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

export default EventsPage;
