import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationDetails({ route }) {
  const { notification } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{notification.title}</Text>
      <Text style={styles.message}>{notification.message}</Text>
      <Text style={styles.date}>{new Date(notification.date).toLocaleString()}</Text>
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
  },
  message: {
    fontSize: 18,
    marginVertical: 20,
  },
  date: {
    fontSize: 16,
    color: '#666',
  },
});
