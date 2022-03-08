import React from 'react';
import Button from '../Button';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { Colors } from '../../assets/Variables';
import image from '../../assets/BG.png';

// FOR LAUNCHING WORKSHOP : DO NOT EDIT
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.navSetting}>
          <Text style={styles.title}>Vous avez maintenant accès à votre profil et vos listes</Text>
        </View>
        <Button
          title='Profil'
          color={Colors.darkGrey70}
          backgroundColor={Colors.white}
          onPress={() => navigation.navigate('Profil')}
        />
        <StatusBar style="auto" translucent={true} />
      </ImageBackground>
    </View>
  );
}

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
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 60,
    marginLeft: 100,
    marginRight: 100
  },
  h2: {
    color: Colors.darkGrey70,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 0,
    marginBottom: 10,
    width: 240,
  },
  text: {
    color: Colors.darkGrey,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 0,
    marginBottom: 40,
    width: 240,
  }
});

export default HomeScreen;