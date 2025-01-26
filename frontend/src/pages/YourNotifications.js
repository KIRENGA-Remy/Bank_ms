import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function YourNotifications({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch notifications from your backend
    const fetchNotifications = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if(!token){
        console.error('Not token found, Please Log in')
        return;
      }
      try {
        const response = await fetch('http://localhost:4321/users/notifications', {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const renderNotification = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.notificationContainer, item.isRead && styles.readNotification]}
        onPress={() => navigation.navigate('NotificationDetails', { notification: item })}
      >
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationDate}>{new Date(item.date).toLocaleString()}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Notifications</Text>
      {unreadCount > 0 && (
        <Text style={styles.unreadCount}>{unreadCount} Unread</Text>
      )}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  unreadCount: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  notificationContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderColor: '#3498db',
  },
  readNotification: {
    backgroundColor: '#e0e0e0',
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 16,
    color: '#666',
  },
  notificationDate: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
});
