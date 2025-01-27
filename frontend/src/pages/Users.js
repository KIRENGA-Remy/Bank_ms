import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Users(){
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available users...</Text>
      <View style={styles.allUsers}>
        <TouchableOpacity>

        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    allUsers:{}
})