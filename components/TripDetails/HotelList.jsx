import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import HotelCard from './HotelCard';

export default function HotelList({ hotelList }) {
  const { isDarkMode } = useTheme();

  return (
    <View style={{
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20,
        color: isDarkMode ? '#ffffff' : '#000000'
      }}>
        🏨 Hotel Recommendation
      </Text>

      <FlatList
        data={hotelList}
        horizontal
        style={{ marginTop: 10 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingRight: 20 }}
        renderItem={({ item }) => (
          <HotelCard item={item} />
        )}
      />
    </View>
  );
}
