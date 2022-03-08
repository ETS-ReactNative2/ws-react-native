import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, ImageBackground } from "react-native";
import ListsPage from "./ListsPage";
import image from "../../assets/BG.png";

// WORKSHOP : DO NOT EDIT
const ShoppingList = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <ListsPage />
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShoppingList;