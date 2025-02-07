import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
  import React, { useState } from 'react';
  import { Picker } from '@react-native-picker/picker';
  
  const { width, height } = Dimensions.get('window');
  
  export default function CreateAccount() {
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [picturePath, setPicturePath] = useState(null);
    const [accountType, setAccountType] = useState('');
    const [includeAddress, setIncludeAddress] = useState(false);
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
  
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
        <Picker
          selectedValue={accountType}
          onValueChange={setAccountType}
          style={styles.selectAccountType}
        >
          <Picker.Item label="Select account type" value="" />
          <Picker.Item label="Admin" value="Admin" />
          <Picker.Item label="Customer" value="Customer" />
          <Picker.Item label="Teller" value="Teller" />
        </Picker>
  
        <TouchableOpacity onPress={() => setIncludeAddress(!includeAddress)}>
          <Text style={styles.checkboxLabel}>
            Include address? {includeAddress ? '👎' : '👍'}
          </Text>
        </TouchableOpacity>
  
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
      borderRadius: 8,
      padding: 12,
      marginVertical: 12,
    },
    selectAccountType: {
      width: '100%',
      marginVertical: 12,
      borderWidth: 1,
      borderRadius: 8,
      padding: 16,
      fontSize: 12,
      backgroundColor: '#e1e1e1',
    },
    checkboxLabel: {
      fontSize: 20,
      color: '#444',
      marginVertical: 8,
      alignSelf: 'center',
    },
  });
  
  