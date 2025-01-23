import { useState } from 'react'
import { View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Pressable,
  Alert,
  Dimensions
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'

const { width, height} = Dimensions.get('window')

export default function Register(){
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [picturePath, setPicturePath] = useState('')

    const [isHovered, setIsHovered] = useState(false)

    const handlePicturePath = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    
      if (!result.canceled) {
        setPicturePath(result.uri);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault()
         if (firstname == '' || lastname == '' || email == '' || password == '' || role == '' || picturePath == ''){
          alert('Please, fill all required fields!')
         }
         try {
          const response = await fetch('http://localhost:4321/users/register',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              firstname, 
              lastname, 
              email, 
              password, 
              role, 
              picturePath
            })
           })
          const dataRes = await response.json();
          if (dataRes.ok){
            Alert.alert(dataRes.message || 'User registered successfully')
            return;
          } else {
            Alert.alert('Error', dataRes.message || "Failed to register user")
          }
          
         } catch (err) {
          console.error('Error during registration:', err)
          Alert.alert('Error', 'An unexpected error occurred.');
         }
    }

    return (
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>
          <TextInput 
          placeholder='Enter your first name'
          placeholderTextColor={'#ccc'}
          value={firstname}
          onChangeText={(text) => setFirstname(text)}
          style={styles.input}
          />
          <TextInput 
          placeholder='Enter your last name'
          placeholderTextColor={'#ccc'}
          value={lastname}
          onChangeText={(text) => setLastname(text)}
          style={styles.input}
          />
          <TextInput 
          placeholder='Enter your email name'
          placeholderTextColor={'#ccc'}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          keyboardType='email-address'
          />
          <TextInput 
          placeholder='Select Role'
          placeholderTextColor={'#ccc'}
          value={role}
          onChangeText={(text) => setRole(text)}
          style={styles.input}
          />
          <TouchableOpacity onPress={handlePicturePath} style={styles.uploadButton}>
            <Text style={styles.uploadImage}>
              { picturePath ? "Change Picture" : "Upload Picture"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.loginNavigation}>
            Already have an account?
            <Pressable 
            onPress={() => console.log('Link Pressed')}
            onPressIn={() => setIsHovered(true)}
            onPressOut={() => setIsHovered(false)}
            >
            <Text style={[styles.loginLink, isHovered && styles.hoverEffect]}>
              Login
            </Text>
            </Pressable>
          </View>
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
      width: '100%',
      backgroundColor: '#fff',
      borderColor: '#f0fff8',
      borderRadius: 8,
      borderWidth: 1,
      marginTop: 24,
      padding: 12,
      color: '#000',
      fontSize: 24
    },
    uploadButton: {
      backgroundColor: '#aaa',
      marginTop: 24,
      padding: 12,
      borderRadius: 8,
      marginHorizontal: 20,
      width: '100%'
    },
    uploadImage: {
      width: '100%',
      color: '#fff',
      opacity: 0.9,
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
    },
    registerButton: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#000',
      backgroundColor: '#4CAF50',
      marginTop: 32,
      marginBottom: 24,
      borderRadius: 8
    },
    registerButtonText: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 28,
      fontWeight: '700',
      padding: 8
    },
    loginNavigation:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500',
    color: '#000'
    },
    loginLink: {
      fontSize: 28,
      fontWeight: '600',
      color: '#000',
    },
    hoverEffect: {
      textDecorationLine: 'underline', 
    },
  })