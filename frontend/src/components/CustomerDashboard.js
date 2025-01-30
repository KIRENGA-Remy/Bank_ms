import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

export default function CustomerDashboard() {
  const [accountDetails, setAccountDetails] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Mock data for demonstration
  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        // Simulate fetching from API
        const response = {
          customerName: 'John Doe',
          email: 'johndoe@example.com',
          balance: 5000,
          accountType: 'Savings',
          transactions: [
            { id: '1', type: 'Deposit', amount: 2000, date: '2025-01-01' },
            { id: '2', type: 'Withdrawal', amount: 1000, date: '2025-01-10' },
          ],
        };
        setAccountDetails({
          name: response.customerName,
          email: response.email,
          balance: response.balance,
          accountType: response.accountType,
        });
        setTransactions(response.transactions);
      } catch (err) {
        console.error('Error fetching account details:', err);
      }
    };
    fetchAccountDetails();
  }, []);

  const handleDeposit = () => {
    Alert.alert('Deposit Money', 'Feature to deposit money will be implemented.');
  };

  const handleWithdraw = () => {
    Alert.alert('Withdraw Money', 'Feature to withdraw money will be implemented.');
  };

  const handleTransfer = () => {
    Alert.alert('Transfer Money', 'Feature to transfer money will be implemented.');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {accountDetails?.name || 'Customer'}</Text>
        <Text style={styles.subText}>Account Type: {accountDetails?.accountType || 'N/A'}</Text>
        <Text style={styles.subText}>Balance: ${accountDetails?.balance?.toFixed(2) || '0.00'}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDeposit}>
          <Text style={styles.actionText}>Deposit Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleWithdraw}>
          <Text style={styles.actionText}>Withdraw Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleTransfer}>
          <Text style={styles.actionText}>Transfer Money</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.transactionHistory}>
        <Text style={styles.sectionTitle}>Transaction History</Text>
        {transactions.length === 0 ? (
          <Text style={styles.noTransactions}>No transactions available.</Text>
        ) : (
          transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <Text style={styles.transactionText}>
                {transaction.type} of ${transaction.amount} on {transaction.date}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  header: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subText: {
    fontSize: 16,
    color: '#dcdcdc',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionHistory: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noTransactions: {
    fontSize: 16,
    color: '#888',
  },
  transactionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  transactionText: {
    fontSize: 16,
    color: '#333',
  },
});
