import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import HomeScreen from '../screens/HomeScreen';
<<<<<<< HEAD
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator()
=======
import GameScreen from '../screens/GameScreen';
import ScoreScreen from '../screens/ScoreScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
>>>>>>> f4e404366374699bb682cbcfaaabe9bab73d4e34

function MyStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registro" component={RegistroScreen} />
            <Stack.Screen name="BottonTab" component={MyTabs} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}

<<<<<<< HEAD
=======
function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Game" component={GameScreen} />
            <Tab.Screen name="Score" component={ScoreScreen} />
            <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
    );
}

>>>>>>> f4e404366374699bb682cbcfaaabe9bab73d4e34
export default function StackNav() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
<<<<<<< HEAD
}

=======
}
>>>>>>> f4e404366374699bb682cbcfaaabe9bab73d4e34
