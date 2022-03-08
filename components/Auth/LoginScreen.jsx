import React, { useState, useEffect } from 'react';
import Button from '../Button';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Alert, TextInput, ImageBackground } from 'react-native';
import { app } from '../../core/config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Colors } from '../../assets/Variables';
import image from '../../assets/BG.png';

// FOR LAUNCHING WORKSHOP : DO NOT EDIT
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace('Accueil');
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Bonjour</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.white}

          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={[styles.input, styles.password]}
          placeholderTextColor={Colors.white}

          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Mot de passe"
          secureTextEntry={true}
        />
        <Button
          title='Connexion'
          raised={true}
          color={Colors.darkGrey70}
          backgroundColor={Colors.white}
          onPress={signIn}
        />
        <View>
          <View style={styles.containerText}>
            <Text style={styles.text}>Pas de compte ?</Text>
            <Text style={[styles.text, styles.textBleu]} onPress={() => navigation.navigate('SignUp')}>Enregistrez-vous</Text>
          </View>

          <Text style={[styles.text, styles.textBleu, { marginTop: 10 }]} onPress={() => Alert.alert('Un email vous a été envoyé avec votre nouveau mot de passe')}>Mot de passe oublié ?</Text>
        </View>
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
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 80,
    textAlign: 'center',
    marginBottom: 60,
  },
  or: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '400',
    margin: 20,
  },
  input: {
    height: 60,
    width: 240,
    margin: 12,
    borderBottomWidth: 2,
    borderColor: Colors.darkGreen,
    padding: 10,
    color: Colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  password: {
    marginBottom: 60,
  },
  containerText: {
    marginTop: 10,
    width: 240,
    flexDirection: 'row'
  },
  text: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 20
  },
  textBleu: {
    color: Colors.darkGreen,
    marginLeft: 0,
  }
});

// EXPORT
export default LoginScreen;
