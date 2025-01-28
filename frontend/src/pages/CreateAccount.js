import { 
    View, 
    Text, 
    ScrollView, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Image, 
    Alert
} from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker'

export default function CreateAccount(){
    const [formdata, setFormdata] = useState({
        customerName: '',
        email: '',
        phone: '',
        accountType: '',
        password: '',
        address: '',
        picturePath: null
    })

    const handleImageUpload = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })
        if(!result.canceled){
            setFormdata.picturePath(result.assets[0])
        }
    }

    const uploadImage = async () => {
        const data = new FormData();
        data.append('photo', {
            uri: formdata.picturePath.uri,
            name: formdata.picturePath.filename || 'photo.jpg',
            type: formdata.picturePath.type || 'image.jpeg'
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
            await uploadImage();
            if(!formdata.customerName || !formdata.phone || !formdata.email || !formdata.password || !formdata.accountType || !formdata.address){
                Alert.alert("Please fill all required fields.")
                return;
              }
            const response = await fetch('http://localhost:4321/customers/create',{
                method: 'POST',
                headers: {
                    "Content-Type":'application/json'
                },
                body: JSON.stringify({formdata})
            })
            if(!response.ok){
                const errorData = await response.json()
                Alert.alert("Error", errorData.message || "Failed to create account.")
            }
        } catch (err) {
            console.log("Error while creating account", err);
            Alert.alert('Error', 'An unexpected error occurred.'); 
        }
    }
  return (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <TextInput 
        placeholder='Enter your name'
        placeholderTextColor={'#ccc'}
        value={formdata.customerName}
        style={styles.input}
        onChangeText={(text) => setFormdata.customerName(text)}
        />
        <TextInput
        placeholder='Enter your email'
        placeholderTextColor={'#ccc'}
        keyboardType='email-address'
        style={styles.input}
        value={formdata.email}
        onChangeText={(text) => setFormdata.email(text)}
        />
        <TextInput 
        placeholder='Enter your password'
        placeholderTextColor={'#ccc'}
        secureTextEntry={true}
        style={styles.input}
        value={formdata.password}
        onChangeText={(text) => setFormdata.password(text)}
        />
        <Picker
        selectedValue={formdata.accountType}
        onValueChange={(value) => setFormdata.accountType(value)}
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
        value={formdata.phone}
        onChangeText={(text) => setFormdata.phone(text)}
        style={styles.input}
        />
        <TextInput 
        placeholder='Enter your street'
        placeholderTextColor={'#ccc'}
        value={formdata.address.street}
        onChangeText={(text) => setFormdata.address.stree(text)}
        style={styles.input}
        />
        <TextInput 
        placeholder='Enter your city'
        placeholderTextColor={'#ccc'}
        value={formdata.address.city}
        onChangeText={(text) => setFormdata.address.city(text)}
        style={styles.input}
        />
        <TextInput 
        placeholder='Enter your state'
        placeholderTextColor={'#ccc'}
        value={formdata.address.state}
        onChangeText={(text) => setFormdata.address.state(text)}
        style={styles.input}
        />
        <TextInput 
        placeholder='Enter your postalCode'
        placeholderTextColor={'#ccc'}
        value={formdata.address.postalCode}
        onChangeText={(text) => setFormdata.address.postalCode}
        style={styles.input}
        />
        <View style={styles.uploadSection}>
            <TouchableOpacity onPress={handleImageUpload}>
                <Text style={styles.uploadImageText}>
                    { formdata.picturePath ? 'Change Image' : 'Upload Image'}
                </Text>
            </TouchableOpacity>
            { 
                formdata.picturePath && (
                    <Image source={{ uri: formdata.picturePath.uri}} style={styles.imagePreview} />
                )
            }
        </View>
        <TouchableOpacity style={styles.createAccountButton} onPress={handleSubmit}>Create Account</TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {},
    title: {},
    input:{},
    selectAccountType: {},
    uploadSection: {},
    uploadImageText: {},
    imagePreview: {},
    createAccountButton: {}
})