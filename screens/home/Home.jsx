import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CircularMenu from '../../components/home/CircularMenu';
import SearchComponent from '../../components/search/SearchComponent';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class Home extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <SearchComponent />
          <CircularMenu />
        </View>
      </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    // Style for your main content if needed
  },
});
