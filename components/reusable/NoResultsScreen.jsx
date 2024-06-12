import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { COLORS } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';

const NoResultsScreen = ({ message, buttonText, onPress }) => {
  return (
    <View style={styles.noResultsContainer}>
      <Text style={styles.noResultsText}>{message}</Text>
      <Button
        title={buttonText}
        onPress={onPress}
        color={COLORS.green}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: COLORS.gray,
    marginBottom: 20,
  }
});

export default NoResultsScreen;
