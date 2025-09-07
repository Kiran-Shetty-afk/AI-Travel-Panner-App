import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { CreateTripContext } from "../context/CreateTripContext";
import { ThemeProvider } from "../context/ThemeContext"; // ✅ import ThemeProvider
import { useState } from "react";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  const [tripData, setTripData] = useState({
    locationInfo: null,
    traveler: null,
    startDate: null,
    endDate: null,
    totalNoOfDays: null,
    tripPlan: {
      tripDetails: {
        flights: [],
        hotels: [],
        itinerary: [],
      },
    },
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider> 
      <CreateTripContext.Provider value={{ tripData, setTripData }}>
        <Stack screenOptions={{ headerShown: false }} />
      </CreateTripContext.Provider>
    </ThemeProvider>
  );
}
