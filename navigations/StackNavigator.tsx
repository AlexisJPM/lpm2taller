import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import ScoreScreen from '../screens/ScoreScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
    return (
        <Stack.Navigator initialRouteName="BottonTab">
            <Stack.Screen name="Home" component={HomeScreen}
             options={{headerShown : false}} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registro" component={RegistroScreen} />
            <Stack.Screen name="BottonTab" component={MyTabs} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Game" component={GameScreen} />
            <Tab.Screen name="Score" component={ScoreScreen} />
            <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
    );
}

export default function StackNav() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}
