import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  TextInput, 
  TouchableOpacity,
  Pressable, 
  Alert,
  Dimensions
} from 'react-native'
import React, { useState } from 'react'

const {width, height } = Dimensions.get('window') 

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isHovered, setIsHovered] = useState(false)

  const handleLogin = async () => {
    if (email == '' || password == ''){
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
      const dataRes = await response.json();
      if (dataRes.ok) {
        Alert.alert('Success', dataRes.message || 'Login successfully');
      } else {
        Alert.alert('Error', dataRes.message || 'Failed to login user');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      Alert.alert('Error', 'Unable to connect to the server. Please check your network connection.');
    }
  }
  return (
    <TouchableWithoutFeedback>
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.registerLink}>
        Don't have an account?
      <Pressable
      onPress={() => console.log('Link Pressed')}
      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}>
        <Text style={[styles.registerLinkText, isHovered && styles.hoverEffect]}>
          Register
        </Text>
      </Pressable>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e1e1',
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
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#4CAF50',
    margin: 24,
    borderRadius: 8
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    padding: 12
  },
  registerLink: {
    display: 'flex',
    flexDirection: 'row',
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    gap:2,
    flexWrap: 'nowrap'
  },
  registerLinkText: {
    fontWeight: '700',
    fontSize: 20
  },
  hoverEffect: {
    textDecorationLine: 'underline'
  }
})