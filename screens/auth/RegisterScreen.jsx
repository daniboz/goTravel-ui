import React, { useState, useContext } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, Switch } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { COLORS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/config';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const RegisterScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); 

  const handleRegister = async (values) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/register`, { ...values, isAdmin });
      if (response.data.status) {
        await AsyncStorage.setItem('token', response.data.token);
        login(response.data.token); 
        navigation.replace('Main');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setModalMessage('Username or email already exists');
      } else {
        setModalMessage('An error occurred during registration. Please try again.');
      }
      setModalVisible(true);
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <View style={styles.inputContainer}>
                <Icon name="person-outline" size={20} color={COLORS.green} style={styles.icon} />
                <TextInput
                  style={[styles.input, touched.username && errors.username && styles.inputError]}
                  placeholder="Username"
                  placeholderTextColor={COLORS.gray}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  autoCapitalize="none"
                />
              </View>
              {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}
              <View style={styles.inputContainer}>
                <Icon name="mail-outline" size={20} color={COLORS.green} style={styles.icon} />
                <TextInput
                  style={[styles.input, touched.email && errors.email && styles.inputError]}
                  placeholder="Email"
                  placeholderTextColor={COLORS.gray}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  autoCapitalize="none"
                />
              </View>
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
              <View style={styles.inputContainer}>
                <Icon name="lock-closed-outline" size={20} color={COLORS.green} style={styles.icon} />
                <TextInput
                  style={[styles.input, touched.password && errors.password && styles.inputError]}
                  placeholder="Password"
                  placeholderTextColor={COLORS.gray}
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.gray} />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
              <View style={styles.inputContainer}>
                <Icon name="lock-closed-outline" size={20} color={COLORS.green} style={styles.icon} />
                <TextInput
                  style={[styles.input, touched.confirmPassword && errors.confirmPassword && styles.inputError]}
                  placeholder="Confirm Password"
                  placeholderTextColor={COLORS.gray}
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Icon name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.gray} />
                </TouchableOpacity>
              </View>
              {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Register as Admin</Text>
                <Switch
                  value={isAdmin}
                  onValueChange={(value) => setIsAdmin(value)}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <Text style={styles.linkText}>
                Already have an account?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                  Login
                </Text>
              </Text>
            </View>
          )}
        </Formik>
        <Modal isVisible={modalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: COLORS.green,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.green,
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
  inputError: {
    borderColor: COLORS.black,
  },
  error: {
    color: COLORS.black,
    marginBottom: 8,
  },
  button: {
    backgroundColor: COLORS.green,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 20,
    textAlign: 'center',
  },
  link: {
    color: COLORS.green,
    textDecorationLine: 'underline',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: COLORS.gray,
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
    backgroundColor: COLORS.green,
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

export default RegisterScreen;
