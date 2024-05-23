import React, { useState, useContext } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { COLORS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';
import Modal from 'react-native-modal';

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required('Username or Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleLogin = async (values) => {
    console.log('handleLogin called with values:', values);
    try {
      const response = await axios.post('http://localhost:5003/api/login', values);
      console.log('Login response:', response.data);
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('id', response.data.id); // Use response.data.id
        login(response.data.token);
        navigation.replace('Main');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage('An error occurred. Please try again.');
      }
      setModalVisible(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back!</Text>
        <Formik
          initialValues={{ usernameOrEmail: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <View style={styles.inputContainer}>
                <Icon name="person-outline" size={20} color={COLORS.red} style={styles.icon} />
                <TextInput
                  style={[styles.input, touched.usernameOrEmail && errors.usernameOrEmail && styles.inputError]}
                  placeholder="Username or Email"
                  placeholderTextColor={COLORS.gray}
                  onChangeText={handleChange('usernameOrEmail')}
                  onBlur={handleBlur('usernameOrEmail')}
                  value={values.usernameOrEmail}
                  autoCapitalize="none"
                />
              </View>
              {touched.usernameOrEmail && errors.usernameOrEmail && <Text style={styles.error}>{errors.usernameOrEmail}</Text>}
              <View style={styles.inputContainer}>
                <Icon name="lock-closed-outline" size={20} color={COLORS.red} style={styles.icon} />
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
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <Text style={styles.linkText}>
                Don't have an account?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                  Register
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
    color: COLORS.red,
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
  inputError: {
    borderColor: COLORS.black,
  },
  error: {
    color: COLORS.black,
    marginBottom: 8,
  },
  button: {
    backgroundColor: COLORS.red,
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
    color: COLORS.red,
    textDecorationLine: 'underline',
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

export default LoginScreen;
