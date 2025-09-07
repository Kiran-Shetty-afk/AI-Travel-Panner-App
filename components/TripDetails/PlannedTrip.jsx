import { View, Text } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import PlaceCard from './PlaceCard';
import { useTheme } from '../../context/ThemeContext';

export default function PlannedTrip({ details }) {
  const { isDarkMode } = useTheme();

  const textColor = isDarkMode ? '#fff' : '#000';
  const subTextColor = isDarkMode ? '#aaa' : Colors.GRAY;
  const bgColor = isDarkMode ? '#121212' : '#fff';

  if (!details || typeof details !== 'object') {
    return (
      <View style={{ marginTop: 20, backgroundColor: bgColor, padding: 10 }}>
        <Text style={{
          fontSize: 16,
          fontFamily: 'outfit-medium',
          color: subTextColor,
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
    <View style={{ marginTop: 20, backgroundColor: bgColor, padding: 10 }}>
      <Text style={{
        fontSize: 20,
        fontFamily: 'outfit-bold',
        color: textColor,
      }}>
        🏕️ Plan Details
      </Text>

      {sortedEntries.map(([day, details]) => (
        <View key={day} style={{ marginTop: 15 }}>
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 20,
            color: textColor,
            marginBottom: 5,
          }}>
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </Text>

          {details?.plan?.map((place, index) => (
            <PlaceCard key={`${day}-${index}`} place={place} />
          ))}
        </View>
      ))}
    </View>
  );
}
