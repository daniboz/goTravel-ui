import React from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import SearchComponent from '../../components/search/SearchComponent';

const Location = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <SearchComponent />
          </View>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: 45.758,
              longitude: 21.230,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            showsUserLocation={true}
            followUserLocation={true}
          >
            {/* Example Marker */}
            <Marker
              coordinate={{ latitude: 45.758, longitude: 21.230 }}
              title={"Piata Unirii"}
              description={"Timișoara, Romania"}
            />
          </MapView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 10, 
    marginTop: 5, 
    zIndex: 5, 
  },
});

export default Location;

