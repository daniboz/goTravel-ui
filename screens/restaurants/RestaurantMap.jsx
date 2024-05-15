import { StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";

const RestaurantMap = ({ coordinates }) => {
  const initialRegion = {
    latitude: coordinates?.latitude ?? 37.7749,
    longitude: coordinates?.longitude ?? -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  if (!coordinates) {
    return <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />;
  }

  return (
    <MapView style={styles.map} initialRegion={initialRegion}>
      <Marker
        coordinate={coordinates}
        title={coordinates.name ? coordinates.name : "Restaurant Location"}
      />
    </MapView>
  );
};

export default RestaurantMap;

const styles = StyleSheet.create({
  map: {
    marginVertical: 10,
    height: 150,
    width: "100%",
    borderRadius: 12,
  },
  loadingIndicator: {
    marginVertical: 10,
  },
});
