import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './src/components/Register';
import Login from './src/components/Login';
import Dashboard from './src/components/Dashboard';
import Users from './src/pages/Users';
import Customers from './src/pages/Customers';
import SendNotifications from './src/pages/SendNotifications';
import YourNotifications from './src/pages/YourNotifications';
import NotificationDetails from './src/pages/NotificationDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Dashboard' component={Dashboard} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        {/* <Stack.Screen name='Home' component={Home } /> */}
        <Stack.Screen name='Users' component={Users} />
        <Stack.Screen name='Customers' component={Customers} />
        <Stack.Screen name='SendNotifications' component={SendNotifications} />
        <Stack.Screen name='YourNotifications' component={YourNotifications} />
        <Stack.Screen name='NotificationDetails' component={NotificationDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
