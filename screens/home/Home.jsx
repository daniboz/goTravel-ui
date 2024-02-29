import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CircularMenu from '../../components/home/CircularMenu';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CircularMenu />
        {/* Other content for your Home screen */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    // Style for your main content if needed
  },
});
