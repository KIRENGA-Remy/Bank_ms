import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons' 
import { ScrollView } from 'react-native-gesture-handler'

export default function Dashboard(){
  return (
    <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <Text style={styles.title}>Admin Dashboard</Text>
            <TouchableOpacity>
                <Ionicons name='notifications' size={24} color={'black'} />
            </TouchableOpacity>
        </View>
        {/* Main content */}
            <ScrollView
            contentContainerStyle={styles.contentScroll}
            >
                <View style={styles.cardsContainer}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Users</Text>
                        <Text style={styles.cardValue}>123</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Customers</Text>
                        <Text style={styles.cardValue}>678</Text>
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
        marginVertical: 2,
        backgroundColor: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 16
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
    }
})