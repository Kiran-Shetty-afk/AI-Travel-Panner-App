import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GetPhotoRef } from '../../services/GooglePlaceAPi';
import { useTheme } from '../../context/ThemeContext'; // Dark mode hook

export default function PlaceCard({ place }) {
  const [photoRef, setPhotoRef] = useState();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    GetGooglePhotoRef();
  }, []);

  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef(place.placeName);
    if (
      result?.results?.[0]?.photos?.[0]?.photo_reference
    ) {
      setPhotoRef(result.results[0].photos[0].photo_reference);
    } else {
      console.warn("No photo reference found for the given location.");
    }
  };

  const backgroundColor = isDarkMode ? '#1e1e1e' : Colors.LIGHT_BLUE;
  const textColor = isDarkMode ? '#fff' : '#000';
  const subTextColor = isDarkMode ? '#ccc' : Colors.GRAY;
  const cardBorder = isDarkMode ? '#333' : Colors.GRAY;

  return (
    <View
      style={{
        backgroundColor,
        padding: 10,
        borderRadius: 15,
        borderColor: cardBorder,
        borderWidth: 1,
        marginTop: 20,
      }}
    >
      {photoRef && (
        <Image
          source={{
            uri:
              `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
          }}
          style={{
            width: '100%',
            height: 140,
            borderRadius: 15,
          }}
        />
      )}

      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20,
        color: textColor,
        marginTop: 10,
      }}>
        {place?.placeName}
      </Text>

      <Text style={{
        fontFamily: 'outfit',
        fontSize: 17,
        color: subTextColor,
        marginTop: 4,
      }}>
        {place.placeDetails}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <View>
          <Text style={{
            fontFamily: 'outfit',
            fontSize: 17,
            color: textColor,
          }}>
            🎟️ Ticket Price:
            <Text style={{
              fontFamily: 'outfit-bold',
              color: textColor,
            }}> {place?.ticketPricing}</Text>
          </Text>

          <Text style={{
            fontFamily: 'outfit',
            fontSize: 17,
            color: textColor,
            marginTop: 5,
          }}>
            ⏱️ Time to Travel:
            <Text style={{
              fontFamily: 'outfit-bold',
              color: textColor,
            }}> {place?.timeToTravel}</Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            const [lat, lng] = place?.geoCoordinates || [];
            if (lat && lng) {
              Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`);
            } else {
              console.warn("Coordinates not available");
            }
          }}
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 8,
            borderRadius: 7,
          }}
        >
          <Ionicons name="navigate" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
