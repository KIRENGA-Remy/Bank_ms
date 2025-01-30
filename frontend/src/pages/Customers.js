import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { FlatList } from 'react-native';

export default function Customers({ route }){
  const { customers } = route.params;

  const handleAddCustomer = () => {}
  
  return (
    <View style={styles.container}>
      <View style={styles.customersHeader}>
      <Text style={styles.title}>Customers</Text>
      <TouchableOpacity style={styles.addCustomer} onPress={handleAddCustomer}>
        <Text style={styles.addCustomerText}>+</Text>
      </TouchableOpacity>
      </View>
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
  customersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    paddingVertical: 10,  
  },
  addCustomer: {
    width: 40,  
    height: 40, 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    borderWidth: 1,
    justifyContent: 'center', 
    alignItems: 'center',  
    elevation: 4, 
  },
  addCustomerText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000', 
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