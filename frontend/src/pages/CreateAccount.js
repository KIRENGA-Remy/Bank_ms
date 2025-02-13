import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

export default function CreateAccount() {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [picturePath, setPicturePath] = useState('');
  const [accountType, setAccountType] = useState('');
  const [includeAddress, setIncludeAddress] = useState(false);
  const [street, setStreet] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleImageUpload = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
      });
      if (result.canceled) return;
      
      if (result.assets && result.assets.length > 0) {
          setPicturePath(result.assets[0].uri); 
      }
  };

  const handleSubmit = async () => {
      setLoading(true);

      try {
          if (!customerName.trim() || !phone.trim() || !email.trim() || !password.trim() || !accountType) {
            Alert.alert("Error", "Please fill all required fields.");
            setLoading(false);
            return;
        }       

          if (password.length < 8) {
              Alert.alert("Error", "Password is very short.");
              setLoading(false);
              return;
          }
          const userdata = {
              email,
              password,
              accountType,
              picturePath,  
              customerName,
              phone,
              ...(includeAddress && { street, state, city, postalCode })
          };

          const response = await fetch('http://localhost:4321/customers/create', {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(userdata)
          });

          if (!response.ok) {
              const errorData = await response.json();
              Alert.alert("Error", errorData.message || "Failed to create account.");
              setLoading(false);
              return;
          }
          const dataRes = await response.json();
          Alert.alert("Success", dataRes.message || "Account created successfully!");
          navigation.navigate('Customers');

      } catch (err) {
          console.error("Error while creating account", err);
          Alert.alert("Error", "An unexpected error occurred.");
      } finally {
          setLoading(false);
      }
  };

  return (
    <ScrollView
      style={{ backgroundColor: '#e1e1e1', flex: 1 }}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        placeholder="Enter your name"
        placeholderTextColor={'#000'}
        value={customerName}
        onChangeText={(text) => setCustomerName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor={'#000'}
        value={email}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter your password"
        placeholderTextColor={'#000'}
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="Enter your phone number"
        placeholderTextColor={'#000'}
        value={phone}
        style={styles.input}
        keyboardType="phone-pad"
        onChangeText={(text) => setPhone(text)}
      />
            <TouchableOpacity onPress={handleImageUpload} style={styles.uploadButton}>
          <Text style={styles.uploadImageText}>
              {picturePath ? "Change Image" : "Upload Image"}
          </Text>
      </TouchableOpacity>
          {picturePath && <Image source={{ uri: picturePath}} style={styles.imagePreview} />}
          <TouchableOpacity 
          style={[styles.createAccountButton, loading && styles.createAccountButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}>
              <Text style={styles.createAccountButtonText}>
                  { loading ? "Creating Account..." : "Create Account"}
              </Text>
          </TouchableOpacity>
      <View>
      <Picker
        selectedValue={accountType}
        onValueChange={setAccountType}
        style={styles.pickerContainer}
      >
        <Picker.Item label="Select account type" value="" />
        <Picker.Item label="Admin" value="Admin" />
        <Picker.Item label="Customer" value="Customer" />
        <Picker.Item label="Vendor" value="Vendor" />
      </Picker>
      </View>
      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>Include address?</Text>
        <TouchableOpacity style={styles.thumbClick} onPress={() => setIncludeAddress(!includeAddress)}>
          <Text>{includeAddress ? '👎' : '👍'}</Text>
        </TouchableOpacity>
      </View>

      {includeAddress && (
        <>
          <TextInput
            placeholder="Street"
            placeholderTextColor={'#000'}
            style={styles.input}
            value={street}
            onChangeText={(text) => setStreet(text)}
          />
          <TextInput
            placeholder="State"
            placeholderTextColor={'#000'}
            value={state}
            onChangeText={(text) => setState(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="City"
            placeholderTextColor={'#000'}
            value={city}
            style={styles.input}
            onChangeText={(text) => setCity(text)}
          />
          <TextInput
            placeholder="Postalcode"
            placeholderTextColor={'#000'}
            onChangeText={(text) => setPostalCode(text)}
            style={styles.input}
            value={postalCode}
            keyboardType="numeric"
            />
          </>
        )}
      </ScrollView>
    );
  }

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: width,
    height: height,
    padding: 46,
    backgroundColor: '#f9f9f9'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
  },
  // selectAccountType: {
  //   width: '100%',
  //   marginVertical: 12,
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   padding: 16,
  //   fontSize: 12,
  //   backgroundColor: '#e1e1e1',
  // },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    fontSize: 12,
    backgroundColor: '#f9f9f9',
    marginVertical: 12,
  },
  checkboxContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 10,
  },
  checkboxLabel: {
  fontSize: 16,
  color: '#fff',
  marginRight: 8,
  },
  thumbClick: {
  padding: 5,
  borderRadius: 5,
  backgroundColor: '#1E90FF',
  },
  uploadButton: { 
      width: "100%", 
      backgroundColor: '#1E90FF',
      opacity: 0.9, 
      padding: 12, 
      borderRadius: 8, 
      alignItems: 'center', 
      marginVertical: 20 
  },
  uploadImageText: {
      fontSize: 24,
      fontWeight: '500',
      textAlign: 'center',
      color: '#fff'
  },
  imagePreview: { 
      width: 100, 
      height: 100, 
      borderRadius: 50 
  },
  createAccountButton: { 
      backgroundColor: '#28a745', 
      padding: 15, 
      borderRadius: 8, 
      alignItems: 'center',
      marginVertical: 12 
  },
  createAccountButtonText: { 
      fontSize: 24, 
      fontWeight: 'bold', 
      color: '#fff' 
  },
  createAccountButtonDisabled: { 
      backgroundColor: '#6c757d' 
  }
});
