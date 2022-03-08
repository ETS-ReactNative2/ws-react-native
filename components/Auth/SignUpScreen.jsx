import React, { useState } from 'react';
import Button from '../Button';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, TextInput, ImageBackground } from 'react-native';
import { setDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { app, db } from '../../core/config';
import { Colors } from '../../assets/Variables';
import image from '../../assets/BG.png';

// FOR LAUNCHING WORKSHOP : DO NOT EDIT
const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        setDoc(userRef, {
          'email': email,
          'password': password
        })
        const user = auth.currentUser;
        updateProfile(user, { displayName: name })
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.navSetting}>
          <Text style={styles.title}>Enregistrement</Text>
        </View>
        <Text style={styles.text}>Il semble que vous n'ayez pas encore de compte.
          Créez-en un.</Text>
        <TextInput
          autoFocus
          style={styles.input}
          placeholderTextColor={Colors.white}

          onChangeText={(text) => setName(text)}
          placeholder="Nom"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.white}

          onChangeText={(text) => setEmail(text)}
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
          color={Colors.white}
          backgroundColor={Colors.darkGreen}
          title={'Enregistrer'}
          onPress={register}
        />
        <Button title="Connexion" onPress={() => navigation.replace("Connexion")} />
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
  },
  text: {
    color: Colors.darkGrey,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 60,
    marginBottom: 20,
    width: 240,
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
    fontWeight: '500',
  },
  password: {
    marginBottom: 60,
  }
});

// EXPORT
export default SignUpScreen;
