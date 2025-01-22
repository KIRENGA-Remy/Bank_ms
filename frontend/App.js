import { StyleSheet, Text, View } from 'react-native';
import Register from './src/components/Register';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>
        <Register />
      </Text>
    </View>
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
