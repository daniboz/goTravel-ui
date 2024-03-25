import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../constants/theme';

const ForumActionButton = ({ onPress }) => {
  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity onPress={onPress} style={styles.fab}>
        <Icon name="edit" size={26} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    margin: 16,
    right: 5,
    bottom: 100,
  },
  fab: {
    backgroundColor: COLORS.red,
    width: 65,
    height: 65,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});

export default ForumActionButton;
