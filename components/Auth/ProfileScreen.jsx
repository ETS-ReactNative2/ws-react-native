import React from 'react';
import Button from '../Button';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { app } from '../../core/config';
import { Colors } from '../../assets/Variables';
import image from '../../assets/BG.png';

const ProfileScreen = ({ navigation }) => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Connexion')
      })
      .catch((error) => alert(error));
  };

  // WORKSHOP TODO : CODE HERE
  return (
    <View >

        <View  >
          <Text >Profil</Text>
        </View>
        
        {/* Display Username of user */}

        {/* Display Email of user */}

        {/*
          Display a Button for
          - go to the shoppping lists 
          - user loggout 
        */}
       
        <StatusBar style="auto" translucent={true} />

    </View>
  );
}

// WORKSHOP TODO : DEFINE YOUR STYLE



// EXPORT
export default ProfileScreen;
