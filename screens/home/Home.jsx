import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CircularMenu from '../../components/home/CircularMenu';
import SearchComponent from '../../components/search/SearchComponent';
import ForumActionButton from '../../components/forum/ForumActionButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class Home extends Component {
  handleForumPress = () => {
    console.log('Forum button pressed');
  }
  
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <SearchComponent />
          </View>
          <CircularMenu />
          <ForumActionButton onPress={this.handleForumPress} />
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
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 10, 
    marginTop: 5, 
    zIndex: 5, 
  },
});
