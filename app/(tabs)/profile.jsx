import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Alert } from 'react-native';
import React from 'react';
import { auth } from './../../configs/FirebaseConfig';
import { signOut, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { Colors } from './../../constants/Colors';
import Constants from 'expo-constants';


export default function Profile() {
  const user = auth.currentUser;
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            signOut(auth)
              .then(() => {
                ToastAndroid.show("Signed out successfully", ToastAndroid.SHORT);
                router.replace('/auth/sign-in');
              })
              .catch((error) => {
                console.error("Sign-out error:", error);
                ToastAndroid.show("Error signing out", ToastAndroid.SHORT);
              });
          }
        }
      ],
      { cancelable: true }
    );
  };


  const handlePasswordReset = () => {
    if (user?.email) {
      sendPasswordResetEmail(auth, user.email)
        .then(() => {
          Alert.alert("Password Reset", "A password reset link has been sent to your email.");
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Error", "Failed to send password reset email.");
        });
    }
  };



  const handleFeedback = () => {
    Alert.alert("Submit Feedback", "We'd love to hear from you! Email us at Kiranshetty2004@gmail.com");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Profile</Text>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{user.displayName ?? user.email.split('@')[0]}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Account Created:</Text>
        <Text style={styles.value}>{new Date(user.metadata.creationTime).toDateString()}</Text>

        <Text style={styles.label}>Last Login:</Text>
        <Text style={styles.value}>{new Date(user.metadata.lastSignInTime).toDateString()}</Text>

        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>Mumbai, India</Text>
      </View>

      <TouchableOpacity onPress={handlePasswordReset} style={styles.resetBtn}>
        <Text style={styles.resetText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleFeedback} style={styles.feedbackBtn}>
        <Text style={styles.feedbackText}>Submit Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/profile/about-us')} style={styles.aboutBtn}>
        <Text style={styles.aboutText}>About Us</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={handleSignOut} style={styles.signOutBtn}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
      <Text style={styles.versionText}>
        Version {Constants.expoConfig?.version || '1.0.0'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: Colors.WHITE,
    height: '100%',
  },
  heading: {
    fontSize: 28,
    fontFamily: 'outfit-bold',
    marginBottom: 20,
  },
  detailBox: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontFamily: 'outfit',
    color: Colors.GRAY,
  },
  value: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
    marginBottom: 10,
  },
  signOutBtn: {
    padding: 15,
    backgroundColor: '#E53935',
    borderRadius: 10,
    marginTop: 20,
  },
  signOutText: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'outfit',
  },
  resetBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginBottom: 15,
  },
  resetText: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'outfit',
  },
  feedbackBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginBottom: 10,
  },
  feedbackText: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'outfit',
  },
  aboutBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginBottom: 15,
  },
  aboutText: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'outfit',
  },
  versionText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 12,
    color: Colors.GRAY,
    fontFamily: 'outfit',
  },
});
