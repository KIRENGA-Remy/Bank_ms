import { 
  View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList, Image 
} from 'react-native';
import React from 'react';

export default function Customers({ route, navigation }) {
  const customers = route?.params?.customers || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.customersHeader}>
        <Text style={styles.title}>Customers</Text>
        <TouchableOpacity 
          style={styles.addCustomer} 
          onPress={() => navigation.navigate('CreateAccount')}
        >
          <Text style={styles.addCustomerText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={customers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.customerCard}>
            <TouchableOpacity style={styles.profileArea}>
              <Image style={styles.imageProfile} source={{ uri: item.picturePath }} />
            </TouchableOpacity>
            
            <View style={styles.cardDetails}>
              <Text style={styles.customerName}>{item.customerName}</Text>
              <Text style={styles.customerEmail}>{item.email}</Text>
              <Text style={styles.accountType}>{item.accountType}</Text>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  customersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222', 
  },
  addCustomer: {
    width: 40,
    height: 40,
    backgroundColor: '#1E90FF', 
    borderRadius: 20,
    // justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  addCustomerText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  customerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  profileArea: {
    marginRight: 15,
  },
  imageProfile: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#FFFFFF', 
  },
  cardDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  customerEmail: {
    fontSize: 14,
    color: '#000', 
    marginBottom: 2,
  },
  accountType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000', 
  },
});
