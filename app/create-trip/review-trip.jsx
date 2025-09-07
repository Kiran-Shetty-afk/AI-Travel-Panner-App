import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from './../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from 'moment';
import { useTheme } from '../../context/ThemeContext';

export default function ReviewTrip() {

    const navigation = useNavigation();
    const { tripData } = useContext(CreateTripContext);
    const router = useRouter();
    const { isDarkMode } = useTheme(); // Get dark mode state

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        });
    }, []);

    // Dynamic color based on dark mode
    const backgroundColor = isDarkMode ? '#1E1E1E' : Colors.WHITE;
    const textColor = isDarkMode ? '#fff' : '#000';
    const grayTextColor = isDarkMode ? '#B0B0B0' : Colors.GRAY;
    const buttonColor = isDarkMode ? '#5A5A5A' : Colors.PRIMARY;

    return (
        <View style={{ padding: 25, paddingTop: 75, backgroundColor, height: '100%' }}>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 35, marginTop: 20, color: textColor }}>
                Review your trip
            </Text>

            <View style={{ marginTop: 20 }}>
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, color: textColor }}>
                    Before generating your trip, please review your selection
                </Text>

                {/* Destination Info */}
                <View style={{ marginTop: 40, display: 'flex', flexDirection: 'row', gap: 20 }}>
                    <Text style={{ fontSize: 30, color: textColor }}>📍</Text>
                    <View>
                        <Text style={{ fontFamily: 'outfit', fontSize: 20, color: grayTextColor }}>
                            Destination
                        </Text>
                        <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, color: textColor }}>
                            {tripData?.locationInfo?.name}
                        </Text>
                    </View>
                </View>

                {/* Date Selected Info */}
                <View style={{ marginTop: 25, display: 'flex', flexDirection: 'row', gap: 20 }}>
                    <Text style={{ fontSize: 30, color: textColor }}>🗓️</Text>
                    <View>
                        <Text style={{ fontFamily: 'outfit', fontSize: 20, color: grayTextColor }}>
                            Travel Date
                        </Text>
                        <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, color: textColor }}>
                            {moment(tripData?.startDate).format('DD MMMM') + " To " +
                                moment(tripData.endDate).format('DD MMMM')} ({tripData?.totalNoOfDays} days)
                        </Text>
                    </View>
                </View>

                {/* Travelers Info */}
                <View style={{ marginTop: 25, display: 'flex', flexDirection: 'row', gap: 20 }}>
                    <Text style={{ fontSize: 30, color: textColor }}>🚌</Text>
                    <View>
                        <Text style={{ fontFamily: 'outfit', fontSize: 20, color: grayTextColor }}>
                            Who is Traveling
                        </Text>
                        <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, color: textColor }}>
                            {tripData?.traveler?.title}
                        </Text>
                    </View>
                </View>

                {/* Budget Info */}
                <View style={{ marginTop: 25, display: 'flex', flexDirection: 'row', gap: 20 }}>
                    <Text style={{ fontSize: 30, color: textColor }}>💰</Text>
                    <View>
                        <Text style={{ fontFamily: 'outfit', fontSize: 20, color: grayTextColor }}>
                            Budget
                        </Text>
                        <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, color: textColor }}>
                            {tripData?.budget}
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => router.replace('/create-trip/generate-trip')}
                style={{
                    padding: 15,
                    backgroundColor: buttonColor,
                    borderRadius: 15,
                    marginTop: 80
                }}>
                <Text style={{
                    textAlign: 'center',
                    color: Colors.WHITE,
                    fontFamily: 'outfit-medium',
                    fontSize: 20
                }}>
                    Build My Trip
                </Text>
            </TouchableOpacity>
        </View>
    );
}
