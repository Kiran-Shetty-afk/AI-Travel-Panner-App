import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function UserTripCard({ trip }) {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const textColor = isDarkMode ? '#fff' : '#000';
  const subTextColor = isDarkMode ? '#ccc' : Colors.GRAY;
  const cardBg = isDarkMode ? '#1e1e1e' : '#fff';

  const formatData = (data) => {
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  };

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

  const photoRef = formatData(trip.tripData)?.locationInfo?.photoRef;

  const imageUrl = photoRef
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
    : 'https://via.placeholder.com/100'; // fallback image

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View
        style={{
          marginTop: 20,
          backgroundColor: cardBg,
          padding: 10,
          borderRadius: 15,
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: imageUrl }}
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
              color: textColor,
            }}
          >
            {trip.tripPlan?.tripDetails?.destination}
          </Text>
          <Text
            style={{
              fontFamily: 'outfit-medium',
              fontSize: 14,
              color: subTextColor,
            }}
          >
            {moment(formatData(trip.tripData)?.startDate).format('DD MMMM YYYY')}
          </Text>
          <Text
            style={{
              fontFamily: 'outfit-medium',
              fontSize: 14,
              color: subTextColor,
            }}
          >
            Traveling: {formatData(trip.tripData)?.traveler?.title || 'Unknown'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
