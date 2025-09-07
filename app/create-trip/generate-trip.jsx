import { View, Text, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    if (
      tripData &&
      tripData.locationInfo &&
      tripData.traveler &&
      tripData.startDate &&
      tripData.endDate &&
      tripData.totalNoOfDays &&
      tripData.budget
    ) {
      GenerateAiTrip();
    } else {
      console.log("❌ Missing trip data:", tripData);
      Alert.alert("Incomplete Trip", "Please complete all trip details before generating the trip.");
    }
  }, []);

  const GenerateAiTrip = async () => {
    try {
      setLoading(true);
      if (!user) {
        console.log("❌ No authenticated user found.");
        setLoading(false);
        return;
      }

      const FINAL_PROMPT = AI_PROMPT
        .replaceAll('{location}', tripData.locationInfo.name)
        .replaceAll('{totalDays}', tripData.totalNoOfDays.toString())
        .replaceAll('{totalNight}', (tripData.totalNoOfDays - 1).toString())
        .replaceAll('{traveler}', tripData.traveler.title)
        .replaceAll('{budget}', tripData.budget);

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
        fontSize: 35,
        textAlign: 'center'
      }}>
        Please wait...
      </Text>
      <Text style={{
        fontFamily: "outfit-bold",
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40
      }}>
        We are working to generate your dream trip
      </Text>

      <LottieView
        source={require('./../../assets/images/plane.json')}
        autoPlay
        loop
        style={{ width: '100%', height: 200 }}
      />

      <Text style={{
        fontFamily: "outfit",
        fontSize: 20,
        color: Colors.GRAY,
        textAlign: "center"
      }}>Do not go back</Text>
    </View>
  );
}
