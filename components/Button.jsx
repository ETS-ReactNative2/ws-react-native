import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../assets/Variables';

//*----------------------- Component Button & Export ----------------------- 
export default function Button(props) {

  return (
    <>
      <TouchableOpacity style={[styles.button, { backgroundColor: props.backgroundColor }]} onPress={props.onPress}>
        <Text style={styles.container}>
          <Text style={[styles.text, { color: props.color }]}>{props.title}</Text>
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 240,
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  text: {
    flex: 3,
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.darkGrey70,
  },
  tinyLogo: {
    flex: 1,
    width: 30,
    height: 30,
    marginRight: 10,
  }
});

