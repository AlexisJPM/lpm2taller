import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';

const Tab = createNativeBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}