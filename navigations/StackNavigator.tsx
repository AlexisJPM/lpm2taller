import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registro" component={RegistroScreen} />
        </Stack.Navigator>
    );
}

export default function StackNav() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}

