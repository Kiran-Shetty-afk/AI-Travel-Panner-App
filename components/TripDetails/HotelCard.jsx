import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetPhotoRef } from '../../services/GooglePlaceAPi';

export default function HotelCard({ item }) {

    const [photoRef, setPhotoRef] = useState();
    useEffect(() => {
        GetGooglePhotoRef();
    }, [])

    const GetGooglePhotoRef = async () => {
        const result = await GetPhotoRef(item.hotel_name);
      
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
            marginRight: 20,
            width: 180,
        }}>
            {photoRef && (
                <Image
                    source={{
                        uri:
                            'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
                            photoRef +
                            '&key=' +
                            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                    }}
                    onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
                    style={{
                        width: 180,
                        height: 120,
                        borderRadius: 15,
                    }}
                />

            )}


            <View style={{
                padding: 5,
            }}>
                <Text
                    style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 17
                    }}>
                    {item.hotel_name}
                </Text>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: 180,
                        marginTop: 4,

                    }}>
                    <Text style={{ fontFamily: 'outfit' }}>⭐ {item.rating}</Text>
                    <Text style={{ fontFamily: 'outfit' }}>💰 {item.price}</Text>
                </View>
            </View>
        </View>
    )
}