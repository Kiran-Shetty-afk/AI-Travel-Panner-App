import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'  

export default function UserTripCard({ trip }) {
  const router = useRouter(); 
  const formatData = (data) => {
    return JSON.parse(data);
  }

  const handlePress = () => {
    if (!trip || !trip.tripData || !trip.tripPlan) {
      console.warn('Incomplete trip data');
      return;
    }
  
    router.push({
      pathname: '/trip-details',
      params: {
        trip: JSON.stringify(trip),
      },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <Image
          source={{
            uri:
              'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
              formatData(trip.tripData)?.locationInfo?.photoRef +
              '&key=' +
              process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 15,
          }}
        />
        <View>
          <Text
            style={{
              fontFamily: 'outfit-medium',
              fontSize: 18,
            }}
          >
            {trip.tripPlan?.tripDetails?.destination}
          </Text>
          <Text
            style={{
              fontFamily: 'outfit-medium',
              fontSize: 14,
              color: Colors.GRAY,
            }}
          >
            {moment(formatData(trip.tripData)?.startDate).format('DD MMMM YYYY')}
          </Text>
          <Text
            style={{
              fontFamily: 'outfit-medium',
              fontSize: 14,
              color: Colors.GRAY,
            }}
          >
            Traveling: {formatData(trip.tripData)?.traveler?.title || 'Unknown'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
