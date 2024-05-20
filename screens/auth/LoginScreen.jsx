import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { COLORS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required('Username or Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen = ({ navigation }) => {
  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://your-api-url/login', values);
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        navigation.replace('Main');
      }
    } catch (error) {
      console.error(error);
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
                />
              </View>
              {touched.usernameOrEmail && errors.usernameOrEmail && <Text style={styles.error}>{errors.usernameOrEmail}</Text>}
              <View style={styles.inputContainer}>
                <Icon name="lock-closed-outline" size={20} color={COLORS.red} style={styles.icon} />
                <TextInput
                  style={[styles.input, touched.password && errors.password && styles.inputError]}
                  placeholder="Password"
                  placeholderTextColor={COLORS.gray}
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
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
              <TouchableOpacity style={styles.testButton} onPress={() => navigation.replace('Main')}>
                <Text style={styles.buttonText}>Go to Home (Test)</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
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
  testButton: {
    backgroundColor: COLORS.red,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
  },
});

export default LoginScreen;
