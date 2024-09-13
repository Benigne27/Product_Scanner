import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import React from "react";
  import { StatusBar } from "expo-status-bar";
  
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;
  
  export default function HomePage() {
    return (
      <View>
        <StatusBar style="auto"/>
        <ImageBackground
          source={require("../assets/HomeTop.png")}
          style={styles.HomeTop}
        ></ImageBackground>
        {/* <View style={styles.OverLay}></View> */}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    HomeTop: {
      width: width,
      height: 330,
    },
    OverLay: {
      height: 230,
      width: 380,
      backgroundColor: "#2F7E79",
      alignSelf: "center",
      position: "absolute",
      top: 200,
      borderRadius: 30,
      shadowOffset: { width: 7, height: 10 },
      shadowColor: "#2F7E79",
      shadowOpacity: 0.3,
    },
  });
  