import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from './../../constants/Colors';
import { SelectTravelesList } from './../../constants/Options';
import Optioncard from './../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';
import { useTheme } from '../../context/ThemeContext';

export default function SelectTraveler() {
  const navigation = useNavigation();
  const router = useRouter();
  const [selectedTraveler, setSelectedTraveler] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
      headerTitleStyle: {
        color: isDarkMode ? '#fff' : '#000',
      },
    });
  }, [isDarkMode]);

  useEffect(() => {
    setTripData({
      ...tripData,
      traveler: selectedTraveler,
    });
  }, [selectedTraveler]);

  const backgroundColor = isDarkMode ? '#000' : Colors.WHITE;
  const textColor = isDarkMode ? '#fff' : '#000';

  return (
    <View style={{ padding: 25, paddingTop: 75, backgroundColor, height: '100%' }}>
      <Text style={{
        fontSize: 35,
        fontFamily: 'outfit-bold',
        marginTop: 20,
        color: textColor,
      }}>
        Who's Traveling
      </Text>

      <View style={{ marginTop: 20 }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 23,
          color: textColor,
        }}>
          Choose your travel type
        </Text>

        <FlatList
          data={SelectTravelesList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedTraveler(item)}
              style={{ marginVertical: 10 }}
            >
              <Optioncard option={item} selectedOption={selectedTraveler} />
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        onPress={() => router.push('/create-trip/select-dates')}
        disabled={!selectedTraveler}
        style={{
          padding: 15,
          backgroundColor: selectedTraveler ? Colors.PRIMARY : Colors.GRAY,
          borderRadius: 15,
          marginTop: 20,
        }}
      >
        <Text style={{
          textAlign: 'center',
          color: Colors.WHITE,
          fontFamily: 'outfit-medium',
          fontSize: 20,
        }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
