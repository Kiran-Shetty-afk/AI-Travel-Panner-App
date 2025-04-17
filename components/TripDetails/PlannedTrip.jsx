import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import PlaceCard from './PlaceCard';
export default function PlannedTrip({ details }) {
  if (!details || typeof details !== 'object') {
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={{
          fontSize: 16,
          fontFamily: 'outfit-medium',
          color: Colors.GRAY
        }}>
          No plan details available.
        </Text>
      </View>
    );
  }

  const sortedEntries = Object.entries(details).sort(
    ([dayA], [dayB]) => {
      const numA = parseInt(dayA.replace(/\D/g, ''), 10);
      const numB = parseInt(dayB.replace(/\D/g, ''), 10);
      return numA - numB;
    }
  );

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{
        fontSize: 20,
        fontFamily: 'outfit-bold'
      }}>🏕️ Plan Details</Text>

      {sortedEntries.map(([day, details]) => (
        <View key={day}>
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 20,
          }}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>

          {details?.plan?.map((place, index) => (
            <PlaceCard key={`${day}-${index}`} place={place} />
          ))}
        </View>
      ))}
    </View>
  );
}