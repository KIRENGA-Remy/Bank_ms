import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

export default function Register(){
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [picturePath, setPicturePath] = useState('')

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

    const handleSubmit = () => {
        // Logic for submitting the registration form
        console.log({ firstname, lastname, email, password, role, picturePath })
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
      width:"100vw",
      height: "100vh",
      padding:46
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
      backgroundColor: '#fff',
      borderColor: '#f0fff8',
      borderRadius: 8,
      borderWidth: 1,
      marginTop: 24,
      padding: 12,
      color: '#000',
      fontSize:24
    },
    uploadButton: {
      width: "100%",
      backgroundColor: '#00FF7B',
      padding: 16,
      marginTop: 24,
      borderRadius: 8,
      marginHorizontal: 20
    },
    uploadImage: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
    },
  })