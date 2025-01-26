import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function CustomersPage(){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CustomersPage</Text>
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