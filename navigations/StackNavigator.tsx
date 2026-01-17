import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from '../screens/HomeScreen';
import MascotasScreen from '../screens/MascotasScreen';
import DatosScreen from '../screens/DatosScreen';
import Screen3 from '../screens/Screen3';
import Screen4 from '../screens/Screen4';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Home" component={HomeScreen}
             options={{headerShown : false}} />
            <Stack.Screen name="BottonTab" component={MyTabs} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Mascotas" component={MascotasScreen} />
            <Tab.Screen name="Screen2" component={DatosScreen} />
            <Tab.Screen name="Screen3" component={Screen3} />
            <Tab.Screen name="Screen4" component={Screen4} />
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
