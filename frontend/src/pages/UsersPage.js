import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function UsersPage(){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>UsersPage</Text>
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
    }
})