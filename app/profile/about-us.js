import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from './../../constants/Colors';
import { router, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function AboutUs() {
    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.heading}>About Us</Text>

            <Text style={styles.paragraph}>
                Welcome to <Text style={styles.highlight}>AI Travel Planner</Text> – your smart travel companion powered by artificial intelligence.
            </Text>

            <Text style={styles.subheading}>📌 Our Mission</Text>
            <Text style={styles.paragraph}>
                Our goal is to make travel planning effortless, personalized, and exciting by leveraging advanced AI technologies like Gemini and location services like Google Maps.
            </Text>

            <Text style={styles.subheading}>🛠️ Built With</Text>
            <Text style={styles.paragraph}>
                - Gemini AI API for trip generation{'\n'}
                - Google Places API for location input{'\n'}
                - Firebase for user authentication and management{'\n'}
                - Expo + React Native for smooth mobile experience
            </Text>

            <Text style={styles.subheading}>👨‍🎓 Developer</Text>
            <Text style={styles.paragraph}>
                Developed by <Text style={styles.highlight}>Kiran Vasant Shetty</Text>{'\n'}
                Final Year Student at LN College of Management and Technology (2024–25)
            </Text>

            <Text style={styles.subheading}>📧 Contact</Text>
            <Text style={styles.paragraph}>
                Have feedback or suggestions? Reach out to us at:{" "}
                <Text style={styles.link}>kiran.shetty2004@gmail.com</Text>
            </Text>

            <Text style={styles.footer}>Version 1.0 • 2025</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: Colors.WHITE,
    },
    heading: {
        fontSize: 28,
        fontFamily: 'outfit-bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subheading: {
        fontSize: 18,
        fontFamily: 'outfit-bold',
        marginTop: 20,
        marginBottom: 5,
    },
    paragraph: {
        fontSize: 16,
        fontFamily: 'outfit',
        color: Colors.GRAY,
        lineHeight: 24,
    },
    highlight: {
        color: Colors.PRIMARY,
        fontFamily: 'outfit-medium',
    },
    link: {
        color: Colors.PRIMARY,
        textDecorationLine: 'underline',
    },
    footer: {
        marginTop: 30,
        textAlign: 'center',
        color: Colors.GRAY,
        fontSize: 14,
        fontFamily: 'outfit',
    },
});
