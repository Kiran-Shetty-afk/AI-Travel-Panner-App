import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetPhotoRef } from '../../services/GooglePlaceAPi';
import { useTheme } from '../../context/ThemeContext';

export default function HotelCard({ item }) {
  const [photoRef, setPhotoRef] = useState();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    GetGooglePhotoRef();
  }, []);

  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef(item.hotelName);
    if (
      result?.results?.[0]?.photos?.[0]?.photo_reference
    ) {
      setPhotoRef(result.results[0].photos[0].photo_reference);
    } else {
      console.warn("No photo reference found for the given location.");
    }
  };

  const textColor = isDarkMode ? '#fff' : '#000';
  const subTextColor = isDarkMode ? '#ccc' : '#444';
  const cardBg = isDarkMode ? '#1e1e1e' : '#fff';

  return (
    <View style={{
        width: 180,
        height: 240,
        marginRight: 15,
        borderRadius: 12,
        backgroundColor: cardBg,
        overflow: 'hidden'
    }}>
      {photoRef && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
          }}
          onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
          style={{
            width: 180,
            height: 120,
          }}
        />
      )}

      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontFamily: 'outfit-medium',
            fontSize: 17,
            color: textColor,
          }}
        >
          {item.hotelName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 4,
          }}
        >
          <Text style={{ fontFamily: 'outfit', color: subTextColor }}>
            ⭐ {item.rating}
          </Text>
          <Text style={{ fontFamily: 'outfit', color: subTextColor }}>
            💰 {item.price}
          </Text>
        </View>
      </View>
    </View>
  );
}
