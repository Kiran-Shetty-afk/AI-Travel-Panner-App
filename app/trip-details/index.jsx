import { View, Text, Image, Dimensions, StatusBar, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors'
import moment from 'moment'
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';
const { width } = Dimensions.get('window');

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });

    if (trip) {
      const parsedTrip = typeof trip === 'string' ? JSON.parse(trip) : trip;
      const parsedTripData = JSON.parse(parsedTrip.tripData);
      setTripDetails({ ...parsedTrip, tripData: parsedTripData });
    }
  }, []);

  if (!tripDetails) return null;

  const locationInfo = tripDetails.tripData?.locationInfo;

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
        <Text>No image available</Text>
      )}

      <View style={{
        padding: 15,
        backgroundColor: Colors.WHITE,
        height: '100%',
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
      }}>
        <Text style={{
          fontSize: 25,
          fontFamily: 'outfit-bold'
        }} >{locationInfo?.name}</Text>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5
        }}>
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 18,
            color: Colors.GRAY
          }}>{moment(tripDetails.tripData.startDate).format('DD MMMM YYYY')}</Text>
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 18,
            color: Colors.GRAY
          }}>- {moment(tripDetails.tripData.endDate).format('DD MMMM YYYY')}</Text>
        </View>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 17,
          color: Colors.GRAY
        }}>🚌{tripDetails.tripData.traveler.title}</Text>


        {/* FLight Info */}

        <FlightInfo flightData={tripDetails?.tripPlan?.tripDetails?.flights} />
        {/* Hotel List */}
        <HotelList hotelList={tripDetails?.tripPlan?.tripDetails?.hotels} />
        {/* Trip Day Planner Info */}
        <PlannedTrip details={tripDetails?.tripPlan?.tripDetails?.itinerary} />  
      </View>


    </ScrollView>
  );
}
