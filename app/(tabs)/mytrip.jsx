import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from './../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig'
import UserTripList from '../../components/MyTrips/UserTripList';
import { router, useRouter } from 'expo-router';
import { useTheme } from './../../context/ThemeContext';


export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useTheme();
  const backgroundColor = isDarkMode ? '#121212' : Colors.WHITE;
  const textColor = isDarkMode ? '#fff' : '#000';


  const router = useRouter();

  useEffect(() => {
    user && GetMyTrips();
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);
    const q = query(collection(db, 'userTrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prev => [...prev, doc.data()]);
    });

    setLoading(false);
  };

  return (
    <ScrollView style={{ backgroundColor }} showsVerticalScrollIndicator={false}>
    <View style={{ padding: 25, paddingTop: 55 }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
          color: textColor
        }}>My Trips</Text>
  
        <TouchableOpacity onPress={() => router.push('/create-trip/search-place')}>
          <Ionicons name="add-circle" size={50} color={textColor} />
        </TouchableOpacity>
      </View>
  
      {loading && <ActivityIndicator size={'large'} color={Colors.PRIMARY} style={{ marginTop: 20 }} />}
  
      {userTrips?.length === 0
        ? <StartNewTripCard />
        : <UserTripList userTrips={userTrips} />
      }
    </View>
  </ScrollView>
  
  )
}
