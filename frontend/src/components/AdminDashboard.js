import {View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons' 
import { ScrollView } from 'react-native-gesture-handler'
import { PieChart } from 'react-native-chart-kit'
import { useNavigation } from '@react-navigation/native'

export default function AdminDashboard(){
    const [financialData, setFinancialData] = useState({
        totalDeposits: 0,
        totalWithdrawals: 0,
        totalTransfers: 0
    })
    const [users, setUsers] = useState([]);
    const [customers, setCustomers] = useState([]);

    const navigation = useNavigation()

    const fetchAllUsers = async () => {
        try {
            const response = await fetch('http://localhost:4321/users')
            if(!response.ok){
                Alert.alert("Error", "Failed to get all users")
                return;
            }
            const dataRes = await response.json();
            const retrievedUsers = dataRes.users;
            setUsers(retrievedUsers)
        } catch (err) {
            Alert.alert('Error', err.message);
        }
    }

    const fetchAllCustomers = async () => {
        try {
            const response = await fetch('http://localhost:4321/admin/accounts')
            if(!response.ok){
                Alert.alert("Error", "Failed to get all customers")
                return;
            }
            const dataRes = await response.json();
            const accounts = dataRes.accounts;
            setCustomers(accounts)
        } catch (err) {
            Alert.alert('Error', err.message);
        }
    }

    const fetchFinancialReport = async () => {
        try {
            const response = await fetch('http://localhost:4321/admin/accounts/get-financial-reports')
            if(!response.ok){
                Alert.alert("Failed to fetch financial report")
                return;
            }
            const dataRes = await response.json()
            setFinancialData({
                totalDeposits: dataRes.totalDeposits,
                totalWithdrawals: dataRes.totalWithdrawals,
                totalTransfers: dataRes.totalTransfers
            })
        } catch (err) {
            Alert.alert('Error', err.message);
        }
    }

    useEffect(() =>{
        fetchFinancialReport()
        fetchAllCustomers()
        fetchAllUsers()
    },[])

    const pieChartData = [
        {
            name: 'Deposits',
            population: financialData.totalDeposits,
            color: '#FF7F50',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        },
        {
            name: 'Withdrawals',
            population: financialData.totalWithdrawals,
            color: '#00BFFF',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        },
        {
            name: 'Transfers',
            population: financialData.totalTransfers,
            color: '#32CD32',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        }
    ];

  return (
    <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <Text style={styles.title}>Admin Dashboard</Text>
            <TouchableOpacity
            onPress={() => navigation.navigate('YourNotifications')}
            >
                <Ionicons name='notifications' size={24} color={'black'} />
            </TouchableOpacity>
        </View>
        {/* Main content */}
            <ScrollView
            contentContainerStyle={styles.contentScroll}
            >
                <View style={styles.cardsContainer}>
                    <TouchableOpacity 
                    style={styles.card}
                    onPress={() => navigation.navigate('Users')}
                    >
                        <Text style={styles.cardTitle}>Users</Text>
                        <Text style={styles.cardValue}>{users.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.card}
                    onPress={() => navigation.navigate('Customers', { customers })}
                    >
                        <Text style={styles.cardTitle}>Customers</Text>
                        <Text style={styles.cardValue}>{customers.length}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.financialTransactionsTitle}>Financial transactions</Text>
                    <View>
                        <PieChart 
                        data={pieChartData}
                        width={300}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#fff',
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                            style:{
                                borderRadius: 16
                            }
                        }}
                        accessor='population'
                        backgroundColor='transparent'
                        paddingLeft='15' 
                        />
                    </View>
                </View>
            </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },    
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    contentScroll: {
        flexDirection: 'column',
        margin: 16
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center'
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        shadowColor:'#000',
        width: '45%',
        shadowRadius: 8,
        elevation: 4,
        shadowOpacity: 0.1,
        padding: 16
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000'
    },
    cardValue: {
        color: '#333',
        fontSize: 20,
        fontWeight: '300'
    },
    financialTransactionsTitle:{
        fontWeight: '700',
        paddingVertical: 20,
        paddingHorizontal: 8,
        fontSize: 20
    }
})