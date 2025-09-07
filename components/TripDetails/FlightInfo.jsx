import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';

export default function FlightInfo({ flightData }) {
  const { isDarkMode } = useTheme();

  if (!flightData || typeof flightData !== 'object') return null;

  const { bookingUrl, price, airline = 'Delta' } = flightData;

  return (
    <View style={styles.container(isDarkMode)}>
      <View style={styles.headerRow}>
      <Text style={styles.heading(isDarkMode)}>✈️ Flights</Text>
        {bookingUrl && (
          <TouchableOpacity
            onPress={() => Linking.openURL(bookingUrl)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Book Here</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.text(isDarkMode), { marginTop: 7 }]}>
        Airline: {airline}
      </Text>

      {price && (
        <Text style={styles.text(isDarkMode)}>
          Price: {price}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: (isDarkMode) => ({
    marginTop: 20,
    borderWidth: 1,
    borderColor: isDarkMode ? '#333' : Colors.LIGHT_GRAY,
    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
    padding: 10,
    borderRadius: 15,
  }),
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 5,
    width: 100,
    borderRadius: 7,
    marginTop: 7,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: 'outfit',
  },
  heading: (isDarkMode) => ({
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: isDarkMode ? '#fff' : '#000',
  }),
  text: (isDarkMode) => ({
    fontFamily: 'outfit',
    fontSize: 17,
    color: isDarkMode ? '#fff' : '#000',
    
  }),
});
