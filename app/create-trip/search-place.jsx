import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import 'react-native-get-random-values';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from './../../context/CreateTripContext';
import { useTheme } from '../../context/ThemeContext';

export default function SearchPlace() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const { isDarkMode } = useTheme();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
      headerTitleStyle: {
        color: isDarkMode ? '#fff' : '#000', // <-- This line fixes header text
      },
    });
  }, []);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  const backgroundColor = isDarkMode ? '#000' : Colors.WHITE;
  const inputBg = isDarkMode ? '#1e1e1e' : '#fff';
  const inputText = isDarkMode ? '#fff' : '#000';

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: backgroundColor,
        height: '100%',
      }}
    >
      <GooglePlacesAutocomplete
        placeholder="Search Place"
        fetchDetails={true}
        onPress={(data, details = null) => {
          setTripData({
            locationInfo: {
              name: data.description,
              coordinates: details?.geometry.location,
              photoRef: details?.photos?.[0]?.photo_reference,
              url: details?.url,
            },
          });

          router.push('/create-trip/select-traveler');
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          language: 'en',
        }}
        styles={{
          textInputContainer: {
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 25,
            backgroundColor: inputBg,
            borderColor: isDarkMode ? '#333' : '#ccc',
          },
          textInput: {
            color: inputText,
            backgroundColor: inputBg,
            fontFamily: 'outfit',
            height: 44,
            fontSize: 16,
          },
          listView: {
            backgroundColor: inputBg,
          },
          row: {
            backgroundColor: inputBg,
            padding: 13,
            height: 44,
            flexDirection: 'row',
          },
          description: {
            color: inputText,
            fontSize: 16,
            fontFamily: 'outfit',
          },
          separator: {
            height: 0.5,
            backgroundColor: isDarkMode ? '#444' : '#ccc',
          },
        }}
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
      />
    </View>
  );
}
