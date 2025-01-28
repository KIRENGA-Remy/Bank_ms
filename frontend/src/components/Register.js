import { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Pressable,
  Alert,
  Dimensions,
  ScrollView,
  Image,
  Platform
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from '@react-native-picker/picker'
const { width, height} = Dimensions.get('window')

export default function Register(){
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [picturePath, setPicturePath] = useState('')

    const [isHovered, setIsHovered] = useState(false)
    const navigation = useNavigation();

    const handleImageUpload = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1
      })
      if(!result.canceled){
        setPicturePath(result.assets[0]);
      }
    }

    const imageUpload = async () => {
        const data = new FormData();
        data.append('photo',{
          uri: picturePath.uri,
          name: picturePath.fileName || 'photo.jpg',
          type: picturePath.type || 'image/jpeg'
        })
      try {
        const response = await fetch('http://localhost:4321/api/upload', {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type':'multipart/form-data'
          },
        })
        const result = await response.json();
        console.log("Uploading image response ", result);
        
      } catch (err) {
        console.log("Error while uploading image", err);
        Alert.alert("Failed to upload image")
        
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        await imageUpload();
        if(!firstname || !lastname || !email || !password || !role){
          Alert.alert("Please fill all required fields.")
          return;
        }
        const response = await fetch('http://localhost:4321/users/register',{
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            role,
            password,
            picturePath: picturePath.uri || null
          })
        })

        if(!response.ok){
          const errorData = await response.json()
          Alert.alert("Error", errorData.message || "Failed to register user")
        }
        const dataRes = await response.json()
        Alert.alert("Success", dataRes.message || 'User registered successfully');
        navigation.navigate('Login');
      } catch (err) {
        console.log("Error while registering", err);
        Alert.alert('Error', 'An unexpected error occurred.'); 
      }
    }

    return (
      <TouchableWithoutFeedback>
        <ScrollView 
        style={{ backgroundColor: '#e1e1e1', flex: 1 }}
        contentContainerStyle={styles.container}>
        <View>
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
          placeholder='Enter your Password'
          placeholderTextColor={'#ccc'}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry={true}
          />
          <Picker
          selectedValue={role}
          onValueChange={(value) => setRole(value)}
          style={styles.selectRole}
          >
            <Picker.Item label='Select role' value={''} />
            <Picker.Item label='Customer' value={'Customer'} />
            <Picker.Item label='Admin' value={'Admin'} />
            <Picker.Item label='Teller' value={'Teller'} />
          </Picker>
          <View style={styles.uploadSection}>
            <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload} >
              <Text style={styles.uploadButtonText}>
                { picturePath ? "Change Image" : 'Upload Image'}
              </Text>
            </TouchableOpacity>
            { picturePath && (
              <Image
              source={{ uri: picturePath.uri }}
              style={ styles.imagePreview}
              />
            )}
          </View>
          <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
            <Text style={styles.registerButtonText}>
              Register
            </Text>
          </TouchableOpacity>
          <View style={styles.loginLink}>
           <Text style={styles.loginText}>
            Already have an account? {' '}
            </Text>
            <Pressable 
            onPress={() => navigation.navigate('Login')}
            onPressIn={() => setIsHovered(true)}
            onPressOut={() => setIsHovered(false)}
            >
            <Text style={[styles.loginLinkText, isHovered && styles.hoverEffect]}>
              Login
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
      width: '100%',
      backgroundColor: '#fff',
      borderColor: '#333',
      borderRadius: 8,
      borderWidth: 1,
      marginTop: 24,
      padding: 12,
      color: '#000',
      fontSize: 24
    },
  selectRole: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#333',
    color: '#333',
    fontSize: 16,
    marginTop: 24,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  uploadSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imagePreview: {
    marginTop: 12,
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  registerButton: {
    backgroundColor: '#28a745',
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  loginLink: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#000',
    fontSize: 14,
  },
  loginLinkText: {
    color: '#007bff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  hoverEffect: {
    fontWeight: 'bold',
  },
});