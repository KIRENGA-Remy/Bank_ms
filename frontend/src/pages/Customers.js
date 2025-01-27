import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { FlatList } from 'react-native';

export default function Customers({ route }){
  const { customers } = route.params;
  console.log(customers);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customers</Text>
      <FlatList
      data={customers}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.customerCard}>
            <Text style={styles.customerName}>{item.customerName}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Phone: {item.phone}</Text>
            <Text>{item.accountType}</Text>
        </View>
      )}
       />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  customerCard: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
});