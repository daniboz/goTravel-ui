import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AdminCircularMenu from '../../../components/admin/AdminCircularMenu';
import { AuthContext } from '../../../context/AuthContext';
import { COLORS } from '../../../constants/theme';

const AdminHome = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Sign Out</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Admin Dashboard</Text>
      <AdminCircularMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  logoutButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: COLORS.red,
    padding: 8,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AdminHome;
