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
  ScrollView
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker';

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
         if (!firstname.trim() || !lastname.trim() || !email.trim() || !password.trim() || !role.trim()){
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
              picturePath: picturePath || null
            })
           })
          if (!response.ok){
            const errorData = await response.json();
            Alert.alert('Error', errorData.message || "Failed to register user")
          }
          const dataRes = await response.json();
          Alert.alert(dataRes.message || 'User registered successfully')
          navigation.navigate('Login');
          return;
         } catch (err) {
          console.error('Error during registration:', err)
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
          {/* <TextInput 
          placeholder='Select Role'
          placeholderTextColor={'#ccc'}
          value={role}
          onChangeText={(text) => setRole(text)}
          style={styles.input}
          /> */}

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
          <TouchableOpacity onPress={handlePicturePath} style={styles.uploadButton}>
            <Text style={styles.uploadImage}>
              { picturePath ? "Change Picture" : "Upload Picture"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={handleSubmit} accessibilityLabel="Register Button">
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
    selectRole : {
      width: '100%',
      borderWidth:1,
      borderColor: '#333',
      color: '#ccc',
      fontSize: 24,
      marginTop: 24,
      padding: 12,
      backgroundColor: '#fff',
      borderRadius: 8
    },
    uploadButton: {
      backgroundColor: '#aaa',
      marginVertical: 24,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
    },
    uploadImage: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
    },
    registerButton: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#000',
      backgroundColor: '#4CAF50',
      marginTop: 40,
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
    loginLink: {
      flexDirection: 'row', 
      justifyContent: 'center',
      alignItems: 'center', 
      marginTop: 16, 
    },
    loginText: {
      fontSize: 16, 
      color: '#555', 
      fontWeight: '500',
    },
    loginLinkText: {
      fontSize: 28,
      fontWeight: '600',
      color: '#000',
    },
    hoverEffect: {
      textDecorationLine: 'underline', 
    },
  })