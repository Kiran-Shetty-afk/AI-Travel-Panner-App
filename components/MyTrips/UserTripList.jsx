import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';
import { Colors } from '../../constants/Colors';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function UserTripList({ userTrips }) {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const cardBg = isDarkMode ? '#1e1e1e' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#000';
  const subTextColor = isDarkMode ? '#ccc' : Colors.GRAY;

  let LatestTrip;
  try {
    LatestTrip = JSON.parse(userTrips[0]?.tripData);
  } catch {
    LatestTrip = {};
  }

  return userTrips && (
    <View>
      <View style={{ marginTop: 20 }}>
        {LatestTrip?.locationInfo?.photoRef ? (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${LatestTrip.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
            }}
            style={{
              width: '100%',
              height: 240,
              resizeMode: 'cover',
              borderRadius: 15,
            }}
          />
        ) : (
          <Image
            source={require('./../../assets/images/travel.png')}
            style={{
              width: '100%',
              height: 240,
              resizeMode: 'cover',
              borderRadius: 15,
            }}
          />
        )}

        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontFamily: 'outfit-medium',
              fontSize: 20,
              color: textColor,
            }}
          >
            {userTrips[0]?.tripPlan?.tripDetails?.destination}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 17,
                color: subTextColor,
              }}
            >
              {moment(LatestTrip?.startDate).format('DD MMMM YYYY')}
            </Text>
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 17,
                color: subTextColor,
              }}
            >
              🚌 {LatestTrip?.traveler?.title || 'Unknown'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/trip-details',
                params: {
                  trip: JSON.stringify(userTrips[0]),
                },
              })
            }
            style={{
              backgroundColor: Colors.PRIMARY,
              padding: 15,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: Colors.WHITE,
                textAlign: 'center',
                fontFamily: 'outfit-medium',
                fontSize: 15,
              }}
            >
              See your plan
            </Text>
          </TouchableOpacity>
        </View>

        {/* Skip first trip to avoid duplicate */}
        {userTrips.slice(1).map((trip, index) => (
          <UserTripCard trip={trip} key={index} />
        ))}
      </View>
    </View>
  );
}
