import React, { Component } from 'react'
import {SafeAreaView, Text, View, StyleSheet } from 'react-native'

export class Profile extends Component {
  render() {
    return (
      <View>
        <SafeAreaView style={styles.SafeAreaView}>
        <Text> Profile </Text>
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Profile
