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
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.navSetting}>
          <Text style={styles.title}>Profil</Text>
        </View>
        
        {/* Display Username of user */}
        <Text style={styles.h2}>Nom</Text>
        <Text style={styles.text}>{auth?.currentUser?.displayName}</Text>

        {/* Display Email of user */}
        <Text style={styles.h2}>Email</Text>

        <Text style={styles.text}>{auth?.currentUser?.email}</Text>
        {/*
          Display a Button for
          - go to the shoppping lists 
          - user loggout 
        */}
        <Button onPress={() => navigation.navigate("Vos listes de courses")}
          color={Colors.darkGreen}
          backgroundColor={Colors.white}
          title='Vers vos listes' 
        />
        <Button
          title='Déconnexion'
          color={Colors.red}
          backgroundColor={Colors.white}
          onPress={logOut}
        />
        <StatusBar style="auto" translucent={true} />
      </ImageBackground>
    </View>
  );
}

// STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.darkGrey,
    fontWeight: '700',
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 60,
  },
  h2: {
    color: Colors.darkGrey70,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 10,
    width: 240,
  },
  text: {
    color: Colors.darkGrey,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 40,
    width: 240,
  }
});

// EXPORT
export default ProfileScreen;