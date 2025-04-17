import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { GetPhotoRef } from '../../services/GooglePlaceAPi';

export default function PlaceCard({ place }) {
  const [photoRef, setPhotoRef] = useState();
  useEffect(() => {
    GetGooglePhotoRef();
  }, [])

  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef(place.place_name);

    if (
      result &&
      result.results &&
      result.results[0] &&
      result.results[0].photos &&
      result.results[0].photos[0]
    ) {
      const photoRef = result.results[0].photos[0].photo_reference;
      setPhotoRef(photoRef);
    } else {
      console.warn("No photo reference found for the given location.");
    }
  };

  return (

    <View style={{
      backgroundColor: Colors.LIGHT_BLUE,
      padding: 10,
      borderRadius: 15,
      borderColor: Colors.GRAY,
      marginTop: 20
    }} >
      <Image
        source={{
          uri:
            'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
            photoRef +
            '&key=' +
            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        }}
        style={{
          width: '100%',
          height: 140,
          borderRadius: 15,
        }}
      />
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20
      }}>{place?.place_name}</Text>
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 17,
        color: Colors.GRAY
      }}>{place.place_details}</Text>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <View>
          <Text style={{
            fontFamily: 'outfit',
            fontSize: 17,
            marginTop: 5
          }}>🎟️ Ticket Price:
            <Text style={{
              fontFamily: 'outfit-bold'
            }}> {place?.ticket_pricing}</Text>
          </Text>
          <Text style={{
            fontFamily: 'outfit',
            fontSize: 17,
            marginTop: 5
          }}>⏱️ Time to Travel:
            <Text style={{
              fontFamily: 'outfit-bold'
            }}> {place?.time_to_travel}</Text></Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            const latitude = place?.geo_coordinates?.[0];
            const longitude = place?.geo_coordinates?.[1];

            if (latitude && longitude) {
              const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
              Linking.openURL(url);
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
  )
}