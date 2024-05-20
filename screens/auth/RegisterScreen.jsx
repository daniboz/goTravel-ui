import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { COLORS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const RegisterScreen = ({ navigation }) => {
  const handleRegister = async (values) => {
    try {
      const response = await axios.post('http://your-api-url/register', values);
      if (response.data.success) {
        navigation.navigate('Login');
      }
    } catch (error) {
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
                <Icon name="person-outline" size={20} color={COLORS.red} style={styles.icon} />
                <TextInput
                  style={[styles.input, touched.username && errors.username && styles.inputError]}
                  placeholder="Username"
                  placeholderTextColor={COLORS.gray}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
              </View>
              {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}
              <View style={styles.inputContainer}>
                <Icon name="mail-outline" size={20} color={COLORS.red} style={styles.icon} />
                <TextInput
                  style={[styles.input, touched.email && errors.email && styles.inputError]}
                  placeholder="Email"
                  placeholderTextColor={COLORS.gray}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </View>
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
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
              <View style={styles.inputContainer}>
                <Icon name="lock-closed-outline" size={20} color={COLORS.red} style={styles.icon} />
                <TextInput
                  style={[styles.input, touched.confirmPassword && errors.confirmPassword && styles.inputError]}
                  placeholder="Confirm Password"
                  placeholderTextColor={COLORS.gray}
                  secureTextEntry
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                />
              </View>
              {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <Text style={styles.linkText}>
                Already have an account?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                  Login
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

export default RegisterScreen;
