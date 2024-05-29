import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import CircularMenu from '../../components/home/CircularMenu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <CircularMenu />
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
