import React, { useContext, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { COLORS } from '../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

const EditProfileScreen = ({ navigation }) => {
  const { user, updateUser } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(user?.profile);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setModalMessage('Permission to access media library is required!');
      setModalVisible(true);
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('ImagePicker result:', result); 

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      console.log('Selected image URI:', selectedImageUri); 
      setImage(selectedImageUri);
    } else {
      console.log('Image picking cancelled or no assets found'); 
    }
  };

  const handleProfileUpdate = async () => {
    if (password !== confirmPassword) {
      setModalMessage('Passwords do not match');
      setModalVisible(true);
      return;
    }
    

    try {
      const formData = new FormData();
      formData.append('username', username);
      if (password) {
        formData.append('password', password);
      }
      if (image && image !== user?.profile) {
        console.log('Uploading new image:', image); 
        formData.append('profile', {
          uri: image,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
      }

      const token = await AsyncStorage.getItem('token');
      console.log('Token retrieved:', token);
      const response = await axios.put('http://localhost:5003/api/users/me', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        console.log('Profile update response data:', response.data);
        const updatedUser = response.data.user;
        updateUser(updatedUser);
        navigation.navigate('Profile');
      }
    } catch (error) {
      setModalMessage('An error occurred while updating the profile. Please try again.');
      setModalVisible(true);
      console.error('Profile update error:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>
        <View style={styles.form}>
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            <Image
              source={{ uri: image ? `${image}?${new Date().getTime()}` : user?.profile }}
              style={styles.profileImage}
            />
            <Text style={styles.changeImageText}>Change Profile Picture</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Icon name="person-outline" size={20} color={COLORS.red} style={styles.icon} />
            <TextInput
              style={[styles.input]}
              placeholder="Username"
              placeholderTextColor={COLORS.gray}
              onChangeText={setUsername}
              value={username}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock-closed-outline" size={20} color={COLORS.red} style={styles.icon} />
            <TextInput
              style={[styles.input]}
              placeholder="Password"
              placeholderTextColor={COLORS.gray}
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              value={password}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.gray} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock-closed-outline" size={20} color={COLORS.red} style={styles.icon} />
            <TextInput
              style={[styles.input]}
              placeholder="Confirm Password"
              placeholderTextColor={COLORS.gray}
              secureTextEntry={!showConfirmPassword}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.gray} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleProfileUpdate}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={modalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    color: COLORS.red,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changeImageText: {
    color: COLORS.red,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.red,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  button: {
    backgroundColor: COLORS.red,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    marginBottom: 12,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: COLORS.red,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '50%',
  },
  modalButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
