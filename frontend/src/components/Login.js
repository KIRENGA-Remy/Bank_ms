import { View, Text } from 'react-native'
import { TextInput } from 'react-native-web'

const Login = () => {
  return (
    <View>
      <Text>Login</Text>
      <TextInput 
      placeholder='Enter your email'
      />
    </View>
  )
}

export default Login