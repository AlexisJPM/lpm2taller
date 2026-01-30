import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import ScoreScreen from '../screens/ScoreScreen';
import PerfilScreen from '../screens/PerfilScreen';
import EditarPerfilScreen from '../screens/EditarPerfilScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Home" component={HomeScreen}
                options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registro" component={RegistroScreen} />
            <Stack.Screen name="BottonTab" component={MyTabs}  />
        </Stack.Navigator>
    );
}

function MyTabs() {
    return (
        <Tab.Navigator >
            <Tab.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false, tabBarIcon: ()=> <MaterialCommunityIcons name="account-supervisor-outline" size={24} color="#0967f3e7" /> }}
            />
            <Tab.Screen name="Game" component={GameScreen} options={{ headerShown: false,  tabBarIcon: ()=> <MaterialCommunityIcons name="gamepad-variant" size={24} color="#0cf54666" /> }}
            />
            <Tab.Screen name="Score" component={ScoreScreen} options={{ headerShown: false, tabBarIcon: ()=> <MaterialIcons name="sports-score" size={24} color="#f1080866" />}}/>
            <Tab.Screen name="Editar" component={EditarPerfilScreen} options={{ headerShown: false, tabBarIcon: ()=> <MaterialIcons name="sports-score" size={24} color="#f1080866" />}}/>
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
