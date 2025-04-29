import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useContext, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { chatSession } from '../../configs/AiModal';
import { useRouter } from 'expo-router';
import { auth, db } from './../../configs/FirebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import LottieView from 'lottie-react-native';

export default function GenerateTrip() {
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  const GenerateAiTrip = async () => {
    try {
      if (
        !tripData.locationInfo ||
        !tripData.traveler ||
        !tripData.startDate ||
        !tripData.endDate ||
        !tripData.totalNoOfDays ||
        !tripData.budget
      ) {
        alert("Please complete all trip details before generating your trip.");
        return;
      }

      setLoading(true);
      if (!user) {
        console.log("❌ No authenticated user found.");
        setLoading(false);
        return;
      }

      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', tripData.locationInfo.name)
        .replace('{totalDays}', tripData.totalNoOfDays)
        .replace('{totalNight}', tripData.totalNoOfDays - 1)
        .replace('{traveler}', tripData.traveler.title)
        .replace('{budget}', tripData.budget);

      console.log("🧠 Prompt sent to Gemini:", FINAL_PROMPT);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const text = await result.response.text();
      console.log("📩 Response from Gemini:", text);

      const tripResp = JSON.parse(text);
      const docId = Date.now().toString();

      await setDoc(doc(db, "userTrips", docId), {
        userEmail: user.email,
        tripPlan: tripResp,
        tripData: JSON.stringify(tripData),
        docId: docId
      });

      console.log("✅ Trip saved to Firestore!");
      setLoading(false);
      router.push("(tabs)/mytrip");

    } catch (error) {
      console.log("❌ Error in GenerateAiTrip:", error.message);
      setLoading(false);
    }
  };

  return (
    <View style={{
      padding: 25,
      paddingTop: 75,
      backgroundColor: Colors.WHITE,
      height: "100%"
    }}>
      <Text style={{
        fontFamily: "outfit-bold",
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20
      }}>
        Ready to create your trip?
      </Text>

      <Text style={{
        fontFamily: "outfit",
        fontSize: 18,
        color: Colors.GRAY,
        textAlign: 'center',
        marginBottom: 30
      }}>
        Tap the button below to generate your AI-powered itinerary.
      </Text>

      <LottieView
        source={require('./../../assets/images/plane.json')}
        autoPlay
        loop
        style={{ width: '100%', height: 200 }}
      />

      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} style={{ marginTop: 40 }} />
      ) : (
        <TouchableOpacity
          onPress={GenerateAiTrip}
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 15,
            borderRadius: 10,
            marginTop: 40
          }}
        >
          <Text style={{
            color: Colors.WHITE,
            fontSize: 18,
            textAlign: 'center',
            fontFamily: "outfit-medium"
          }}>Generate Trip</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
