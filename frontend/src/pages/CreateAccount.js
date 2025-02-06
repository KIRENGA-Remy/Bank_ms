import {
     View, 
     Text, 
     ScrollView, 
     StyleSheet,
     Dimensions, } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window')

export default function CreateAccount(){
  return (
    <ScrollView style={{ backgroundColor: '#e1e1e1', flex: 1}} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {alignItems: 'center', width: width, height: height, padding: 46 },
    title: {fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20}
})