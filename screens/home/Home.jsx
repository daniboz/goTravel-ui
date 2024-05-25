import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import CircularMenu from '../../components/home/CircularMenu';
import SearchComponent from '../../components/search/SearchComponent';
import ForumActionButton from '../../components/forum/ForumActionButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const handleForumPress = () => {
    console.log('Forum button pressed');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <SearchComponent />
          <CircularMenu />
          <ForumActionButton onPress={handleForumPress} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

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
  content: {},
});

export default Home;
