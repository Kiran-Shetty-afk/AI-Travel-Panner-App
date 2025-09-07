import { View, Text, Image, Dimensions, StatusBar, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);
  const { isDarkMode } = useTheme();
  const bgColor = isDarkMode ? '#121212' : Colors.WHITE;
  const textColor = isDarkMode ? '#fff' : '#000';
  const subTextColor = isDarkMode ? '#ccc' : Colors.GRAY;


  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });

    try {
      if (trip) {
        const parsedTrip = typeof trip === 'string' ? JSON.parse(trip) : trip;
        const parsedTripData = parsedTrip?.tripData ? JSON.parse(parsedTrip.tripData) : null;
        if (parsedTripData) {
          setTripDetails({ ...parsedTrip, tripData: parsedTripData });
        }
      }
    } catch (error) {
      console.error('Failed to parse trip data:', error);
      setTripDetails(null);
    }
  }, []);

  if (!tripDetails) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Trip data is missing or invalid.</Text>
      </View>
    );
  }

  const locationInfo = tripDetails.tripData?.locationInfo;
  const startDate = tripDetails.tripData?.startDate;
  const endDate = tripDetails.tripData?.endDate;
  const travelerTitle = tripDetails.tripData?.traveler?.title || 'Traveler info unavailable';

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {locationInfo?.photoRef ? (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
          }}
          style={{
            width: width,
            height: 330 + (StatusBar.currentHeight || 0),
            marginTop: -(StatusBar.currentHeight || 0),
          }}
          resizeMode="cover"
        />
      ) : (
        <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No image available</Text>
        </View>
      )}

      <View style={{
        padding: 15,
        backgroundColor: bgColor,
        height: '100%',
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}>
        <Text style={{ fontSize: 25, fontFamily: 'outfit-bold', color: textColor }}>
          {locationInfo?.name || 'Unknown Location'}
        </Text>

        {(startDate && endDate) ? (
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 18,
              color: Colors.GRAY,
            }}>
              {moment(startDate).format('DD MMMM YYYY')}
            </Text>
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 18,
              color: Colors.GRAY,
            }}>
              - {moment(endDate).format('DD MMMM YYYY')}
            </Text>
          </View>
        ) : (
          <Text style={{ fontFamily: 'outfit-medium', fontSize: 18, color: Colors.GRAY }}>
            Date information not available
          </Text>
        )}

        <Text style={{ fontFamily: 'outfit', fontSize: 17, color: Colors.GRAY }}>
          🚌 {travelerTitle}
        </Text>

        {/* Flight Info */}
        <FlightInfo flightData={tripDetails?.tripPlan?.tripDetails?.flights || []} />

        {/* Hotel List */}
        <HotelList hotelList={tripDetails?.tripPlan?.tripDetails?.hotels || []} />

        {/* Trip Day Planner Info */}
        <PlannedTrip details={tripDetails?.tripPlan?.tripDetails?.itinerary || []} />
      </View>
    </ScrollView>
  );
}
