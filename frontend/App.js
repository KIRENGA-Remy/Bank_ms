import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './src/components/Register';
import Login from './src/components/Login';
import AdminDashboard from './src/components/AdminDashboard';
import Users from './src/pages/Users';
import Customers from './src/pages/Customers';
import SendNotifications from './src/pages/SendNotifications';
import YourNotifications from './src/pages/YourNotifications';
import NotificationDetails from './src/pages/NotificationDetails';
import CreateAccount from './src/pages/CreateAccount';
import CustomerDashboard from './src/components/CustomerDashboard';
import TellerDashboard from './src/components/TellerDashboard';

const Stack = createStackNavigator();
console.log(CreateAccount);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='AdminDashboard' component={AdminDashboard} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='CustomerDashboard' component={CustomerDashboard} />
        <Stack.Screen name='CreateAccount' component={CreateAccount} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='TellerDashboard' component={TellerDashboard} />
        <Stack.Screen name='Users' component={Users} />
        {/* <Stack.Screen options={{ headerShown: false}} /> */}
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
