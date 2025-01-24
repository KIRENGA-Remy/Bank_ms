import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  TextInput, 
  TouchableOpacity,
  Pressable, 
  Alert,
  Dimensions,
  ScrollView
} from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window') 

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()){
      Alert.alert('Email and Password are required fields!')
      return;
    }
    if(!/^\S+@\S+\.\S+$/.test(email)){
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    try {
      const response = await fetch('http://localhost:4321/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email,password })
      })
      if (!response.ok) {
        const errorData = await response.json()
        Alert.alert('Error', errorData.message || 'Failed to login user');
        return;
      }
      const dataRes = await response.json()
      Alert.alert('Success', dataRes.message || 'Login successfully');
      navigation.navigate('Home')
    } catch (err) {
      console.error('Error logging in:', err);
      Alert.alert('Error', 'Unable to connect to the server. Please check your network connection.');
    }
  }
  return (
    <TouchableWithoutFeedback>
    <ScrollView
    style={{backgroundColor: '#e1e1e1', flex: 1}}
    contentContainerStyle={styles.container}
    >
    <View>
      <Text style={styles.title}>Login</Text>
      <TextInput 
      placeholder='Enter your email'
      placeholderTextColor={'#ccc'}
      value={email}
      onChangeText={(text) => setEmail(text)}
      keyboardType='email-address'
      style={styles.input}
      />
      <TextInput 
      placeholder='Enter your password'
      placeholderTextColor={'#ccc'}
      secureTextEntry={true}
      value={password}
      onChangeText={(text) => setPassword(text)}
      style={styles.input}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} accessibilityLabel="Login Button">
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.registerLink}>
  <Text style={styles.registerText}>
    Don't have an account?{' '}
  </Text>
  <Pressable
    onPress={() => navigation.navigate('Register')}
    onPressIn={() => setIsHovered(true)}
    onPressOut={() => setIsHovered(false)}
  >
    <Text style={[styles.registerLinkText, isHovered && styles.hoverEffect]}>
      Register
    </Text>
  </Pressable>
</View>

    </View>
    </ScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width,
    height: height,
    padding: 46
  },
  title: {
    color: '#000',
    fontFamily: 'Arial',
    fontSize: 28,
    fontWeight: '700',
    margin: 24,
    textAlign: 'center'
  },
  input: {
    width:'100%',
    borderWidth: 1,
    borderColor: '#f0fff8',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    marginTop: 24,
    fontSize: 24
  },
  loginButton: {
    width:"100%",
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#4CAF50',
    marginTop: 40,
    marginBottom: 24,
    borderRadius: 8
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    padding: 8
  },
  registerLink: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 16, 
  },
  registerText: {
    fontSize: 16, 
    color: '#555', 
    fontWeight: '500',
  },
  registerLinkText: {
    fontSize: 16, 
    color: '#444', 
    fontWeight: '700',
  },
  hoverEffect: {
    textDecorationLine: 'underline',
  },
})