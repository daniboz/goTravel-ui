import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CircularMenu from '../../components/home/CircularMenu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { COLORS } from '../../constants/theme';

const Home = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Nice to have you here,</Text>
            <Text style={styles.userText}>{user?.username}</Text>
          </View>
          <Text style={styles.logoText}>
            <Text style={styles.goText}>go</Text>
            <Text style={styles.travelText}>Travel</Text>
          </Text>
        </View>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 40,
    alignSelf: 'center',
  },
  welcomeContainer: {
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '300',
    color: COLORS.black,
  },
  userText: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.red,
    textTransform: 'capitalize',
    marginTop: 4,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  goText: {
    color: COLORS.black,
  },
  travelText: {
    color: COLORS.red,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginBottom: 40
  },
  content: {},
});

export default Home;
