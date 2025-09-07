import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigation, useRouter } from 'expo-router';
import { SelectBudgetOptions } from '../../constants/Options';
import OptionCard from './../../components/CreateTrip/OptionCard';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import { useTheme } from '../../context/ThemeContext';

export default function SelectBudget() {

    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();
    const { isDarkMode } = useTheme();  // Access the dark mode flag

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        });
    }, []);

    useEffect(() => {
        selectedOption && setTripData({
            ...tripData,
            budget: selectedOption?.title
        });
    }, [selectedOption]);

    const onClickContinue = () => {
        if (!selectedOption) {
            ToastAndroid.show('Select Your Budget', ToastAndroid.LONG);
            return;
        }

        router.push('/create-trip/review-trip');
    };

    // Define colors based on dark mode
    const backgroundColor = isDarkMode ? '#000' : Colors.WHITE;
    const textColor = isDarkMode ? '#fff' : '#000';
    const buttonColor = isDarkMode ? Colors.PRIMARY : Colors.PRIMARY;
    const cardBg = isDarkMode ? '#333' : '#fff';

    return (
        <View style={{
            paddingTop: 75,
            padding: 25,
            backgroundColor: backgroundColor,
            height: '100%'
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 35,
                marginTop: 20,
                color: textColor // Apply dynamic text color
            }}>Budget</Text>

            <View style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 20,
                    color: textColor // Apply dynamic text color
                }}>Choose spending habits for your trip</Text>

                <FlatList
                    data={SelectBudgetOptions}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={{ marginVertical: 10 }}
                            onPress={() => setSelectedOption(item)}
                        >
                            {/* Pass isDarkMode to OptionCard for theme-specific styling */}
                            <OptionCard option={item} selectedOption={selectedOption} isDarkMode={isDarkMode} />
                        </TouchableOpacity>
                    )}
                />
            </View>

            <TouchableOpacity
                onPress={() => onClickContinue()}
                style={{
                    padding: 15,
                    backgroundColor: buttonColor, // Use dynamic button color
                    borderRadius: 15,
                    marginTop: 20
                }}>

                <Text style={{
                    textAlign: 'center',
                    color: Colors.WHITE,
                    fontFamily: 'outfit-medium',
                    fontSize: 20
                }}>Continue</Text>

            </TouchableOpacity>
        </View>
    );
}
