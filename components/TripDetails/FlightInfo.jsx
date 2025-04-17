import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function FlightInfo({ flightData }) {
    if (!flightData || typeof flightData !== 'object') return null;

    const { booking_url, price } = flightData;

    return (
        <View
            style={{
                marginTop: 20,
                borderWidth: 1,
                borderColor: Colors.LIGHT_GRAY,
                padding: 10,
                borderRadius: 15,
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 20,
                    }}
                >
                    ✈️ Flights
                </Text>
                {booking_url && (
                    <TouchableOpacity
                        onPress={() => Linking.openURL(booking_url)}
                        style={{
                            backgroundColor: Colors.PRIMARY,
                            padding: 5,
                            width: 100,
                            borderRadius: 7,
                            marginTop: 7,
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                color: Colors.WHITE,
                                fontFamily: 'outfit',
                            }}
                        >
                            Book Here
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 17,
                marginTop:7
            }}>Airline:Delta</Text>
            {price && (
                <Text
                    style={{
                        fontFamily: 'outfit',
                        fontSize: 17,
                    }}
                >
                    Price: {price}
                </Text>
            )}
        </View>
    );
}
