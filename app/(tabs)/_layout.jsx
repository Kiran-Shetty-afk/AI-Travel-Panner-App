import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from './../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';

export default function TabLayout() {
  const { isDarkMode } = useTheme();

  const tabBarStyle = {
    backgroundColor: isDarkMode ? '#121212' : '#fff',
    borderTopColor: isDarkMode ? '#333' : '#ccc',
  };

  const labelColor = isDarkMode ? '#fff' : '#000';

  return (
  <Tabs
  screenOptions={{
    headerShown: false,
    tabBarStyle,
    tabBarLabelStyle: {
      fontFamily: 'outfit',
      color: labelColor,
    },
  }}
>
  <Tabs.Screen
    name="mytrip"
    options={{
      tabBarLabel: 'My Trip',
      tabBarIcon: () => (
        <Ionicons name="location-sharp" size={28} color="blue" />
      ),
    }}
  />
  <Tabs.Screen
    name="discover"
    options={{
      tabBarLabel: 'Discover',
      tabBarIcon: () => (
        <Ionicons name="globe-sharp" size={28} color="blue" />
      ),
    }}
  />
  <Tabs.Screen
    name="profile"
    options={{
      tabBarLabel: 'Profile',
      tabBarIcon: () => (
        <Ionicons name="people-circle" size={30} color="blue" />
      ),
    }}
  />
</Tabs>

  );
}
