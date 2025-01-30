import { 
    View, 
    Text, 
    ScrollView, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Image, 
    Alert,
    Dimensions
} from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window') 

export default function CreateAccount(){
    const [customerName, setCustomerName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [accountType, setAccountType] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [picturePath, setPicturePath] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageUpload = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })
        if(!result.canceled){
            setPicturePath(result.assets[0])
        }
    }

    const uploadImage = async () => {
        const data = new FormData();
        data.append('photo', {
            uri: picturePath.uri,
            name: picturePath.filename || 'photo.jpg',
            type: picturePath.type || 'image.jpeg'
        })
        try {
            const response = await fetch('http://localhost:4321/api/upload',{
                method: 'POST',
                body: data,
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })
            const result = await response.json();
            console.log("Upload image upload", result);
            
        } catch (err) {
            console.log("Error while uploading image", err);
            Alert.alert("Failed to upload image");
            
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            await uploadImage();
            if(!customerName || !phone || !email || !password || !accountType || !address){
                Alert.alert("Please fill all required fields.")
                return;
              }
            if (password.length < 8) {
                Alert.alert("Error", "Password must be at least 8 characters long.");
                return;
              }
            const response = await fetch('http://localhost:4321/customers/create',{
                method: 'POST',
                headers: {
                    "Content-Type":'application/json'
                },
                body: JSON.stringify({
                    customerName,
                    email,
                    phone,
                    accountType,
                    password,
                    street,
                    city,
                    state,
                    postalCode
                })
            })
            if(!response.ok){
                const errorData = await response.json()
                Alert.alert("Error", errorData.message || "Failed to create account.")
            }
        } catch (err) {
            console.log("Error while creating account", err);
            Alert.alert('Error', 'An unexpected error occurred.'); 
        } finally {
            setLoading(false)
        }
    }
  return (
    <TouchableWithoutFeedback>
    <ScrollView 
    contentContainerStyle={styles.container}
    style={{ backgroundColor: '#e1e1e1', flex: 1 }}
    >
        <Text style={styles.title}>Create Account</Text>
        <TextInput 
        placeholder='Enter your name'
        placeholderTextColor={'#ccc'}
        value={customerName}
        style={styles.input}
        onChangeText={(text) => setCustomerName(text)}
        />
        <TextInput
        placeholder='Enter your email'
        placeholderTextColor={'#ccc'}
        keyboardType='email-address'
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        />
        <TextInput 
        placeholder='Enter your password'
        placeholderTextColor={'#ccc'}
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        />
        <Picker
        selectedValue={accountType}
        onValueChange={(value) => setAccountType(value)}
        style={styles.selectAccountType}
        >
            <Picker.Item label='Select account type' value={''} />
            <Picker.Item label='Admin' value={'Admin'} />
            <Picker.Item label='Customer' value={'Customer'} />
            <Picker.Item label='Teller' value={'Teller'} />
        </Picker>
        <TextInput 
        placeholder='Enter your phone number'
        placeholderTextColor={'#ccc'}
        value={phone}
        keyboardType='phone-pad'
        onChangeText={(text) => setPhone(text)}
        style={styles.input}
        />
        <Text style={styles.addressTitle}>Address (Optional)</Text>
        <TextInput 
        placeholder='Enter your street'
        placeholderTextColor={'#ccc'}
        value={street}
        onChangeText={(text) => setStreet(text)}
        style={styles.input}
        />
        <TextInput 
        placeholder='Enter your city'
        placeholderTextColor={'#ccc'}
        value={city}
        onChangeText={(text) => setCity(text)}
        style={styles.input}
        />
        <TextInput 
        placeholder='Enter your state'
        placeholderTextColor={'#ccc'}
        value={state}
        onChangeText={(text) => setState(text)}
        style={styles.input}
        />
        <TextInput 
        placeholder='Enter your postalCode'
        placeholderTextColor={'#ccc'}
        keyboardType='numeric'
        value={postalCode}
        onChangeText={(text) => setPostalCode(text)}
        style={styles.input}
        />
            <TouchableOpacity onPress={handleImageUpload} style={styles.uploadButton}>
                <Text style={styles.uploadImageText}>
                    { picturePath ? 'Change Image' : 'Upload Image'}
                </Text>
            </TouchableOpacity>
            { 
                picturePath && (
                    <Image source={{ uri: picturePath.uri}} style={styles.imagePreview} />
                )
            }
        <TouchableOpacity 
        style={[styles.createAccountButton, loading && styles.createAccountButtonDisabled]} 
        onPress={handleSubmit}
        disabled={loading}
        >
           <Text style={styles.createAccountButtonText}>
            Create Account
           </Text>
        </TouchableOpacity>
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
        fontSize: 24,
        fontWeight: 'bold',
        textAlign:'center',
        marginBottom: 20,
        color: '#333'
    },
    input:{
        width: '100%',
        borderColor: '#333',
        borderWidth: 1,
        color: '#000',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginVertical: 12,
        fontSize: 20
    },
    selectAccountType: {
        width: '100%',
        borderColor: '#333',
        borderWidth: 1,
        color: '#000',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginVertical: 12,
        fontSize: 20
    },
    addressTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#777',
        marginBottom: -12,
    },
    uploadButton: {
        backgroundColor: '#5599ee',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 15
    },
    uploadImageText: {
        color: '#fff',
        fontSize: 16
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 15
    },
    createAccountButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 15
    },
    createAccountButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    createAccountButtonDisabled: {
        backgroundColor: '#6c757d'
    }
})