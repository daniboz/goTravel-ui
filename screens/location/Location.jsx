import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ActivityIndicator, Text, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TAB_BAR_HEIGHT } from '../../constants/theme';

const LocationScreen = ({ route, navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showDirectionsButton, setShowDirectionsButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);
  const { latitude, longitude, name, reset } = route.params || {};

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log('Current Location:', location.coords);
    setCurrentLocation(location.coords);
    return location.coords;
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchLocation = async () => {
        setLoading(true);
        const location = await getLocation();
        if (isActive) {
          if (reset) {
            console.log('Resetting state to current location');
            setDestination(null);
            if (mapRef.current) {
              mapRef.current.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }, 1000);
            }
          } else if (latitude && longitude) {
            console.log('Setting destination from route params', { latitude, longitude, name });
            setDestination({ latitude, longitude, name });
            setShowDirectionsButton(true);
            if (mapRef.current) {
              mapRef.current.animateToRegion({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }, 1000);
            }
          }
          setLoading(false);
        }
      };

      fetchLocation();

      return () => {
        isActive = false;
        console.log('LocationScreen unfocused, clearing state');
        setDestination(null);
        setShowDirectionsButton(false);
      };
    }, [route])
  );

  useEffect(() => {
    if (destination && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: destination.latitude,
        longitude: destination.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  }, [destination]);

  const handleGetDirections = () => {
    console.log('Get Directions button pressed');
    if (currentLocation && destination) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destination.latitude},${destination.longitude}&travelmode=driving`;
      console.log('Opening URL:', url);
      Linking.openURL(url).catch(err => console.error('An error occurred', err));
    } else {
      console.log('Current location or destination not set');
    }
  };

  const handleBackToCurrentLocation = async () => {
    console.log('Back to current location button pressed');
    const location = await getLocation();
    if (mapRef.current && location) {
      console.log('Animating to current location:', location);
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  const initialRegion = {
    latitude: destination?.latitude || currentLocation?.latitude || 45.7036,
    longitude: destination?.longitude || currentLocation?.longitude || 21.1845,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handlePlaceSelected = (data, details) => {
    console.log('Place selected:', data, details);
    const { lat, lng } = details.geometry.location;
    const newDestination = {
      latitude: lat,
      longitude: lng,
      name: details.name,
    };
    setDestination(newDestination);
    setShowDirectionsButton(true);
    console.log('Show directions button set to true');
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...newDestination,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  const handlePoiClick = (event) => {
    const { coordinate, name } = event.nativeEvent;
    console.log('POI clicked:', coordinate, name);
    const newDestination = {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      name: name,
    };
    setDestination(newDestination);
    setShowDirectionsButton(true);
    console.log('Show directions button set to true');
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...coordinate,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  const handleMapPress = () => {
    setDestination(null);
    setShowDirectionsButton(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <GooglePlacesAutocomplete
              placeholder='Search here...'
              fetchDetails
              onPress={handlePlaceSelected}
              query={{
                key: 'AIzaSyCHvFDVrL28q-pB9AknseyRyuZHbpdGxUA',
                language: 'en',
              }}
              styles={{
                container: styles.searchContainerStyle,
                textInput: styles.searchInput,
                listView: styles.listView,
                description: styles.description,
                predefinedPlacesDescription: styles.predefinedPlacesDescription,
              }}
            />
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={initialRegion}
              showsUserLocation={true}
              followUserLocation={true}
              onPoiClick={handlePoiClick}
              onPress={handleMapPress}
              onMapReady={() => {
                if (destination) {
                  mapRef.current.animateToRegion({
                    latitude: destination.latitude,
                    longitude: destination.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }, 1000);
                } else if (currentLocation) {
                  mapRef.current.animateToRegion({
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }, 1000);
                }
              }}
            >
              {destination && (
                <Marker
                  coordinate={destination}
                  title={destination.name}
                  pinColor="red"
                />
              )}
            </MapView>
          )}
          {showDirectionsButton && currentLocation && destination && (
            <TouchableOpacity
              style={styles.directionsButton}
              onPress={handleGetDirections}
            >
              <Text style={styles.directionsButtonText}>Get Directions</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.currentLocationButton}
            onPress={handleBackToCurrentLocation}
          >
            <Ionicons name="locate" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: TAB_BAR_HEIGHT,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 10,
    top: 10,
    zIndex: 5,
  },
  searchContainerStyle: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    height: 44,
    color: '#5d5d5d',
    fontSize: 16,
    flex: 1,
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginTop: 10,
  },
  description: {
    fontWeight: 'bold',
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  directionsButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: COLORS.green,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  directionsButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 110, 
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default LocationScreen;
