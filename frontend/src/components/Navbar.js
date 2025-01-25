import { View, Text } from 'react-native'
import React from 'react'

export default function Navbar() {
  return (
    <View>
      <View>LOGO</View>
      <View>
        <Text>Home</Text>
        <Text>Transactions</Text>
        <Text>Withdraw</Text>
        <Text>Deposit</Text>
        <Text>Contact</Text>
      </View>
      <View>AUTH</View>
    </View>
  )
}