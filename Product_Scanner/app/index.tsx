import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import { StatusBar } from "expo-status-bar";
  import { Link, Stack } from "expo-router";
  
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;
  
  export default function Debut() {
    return (
      <View style={styles.container}>
        
        <StatusBar style="auto"/>
        <SafeAreaView></SafeAreaView>
        <View>
          <Image
            source={require("../assets/images/Scan.png")}
            style={styles.ManImage}
          />
        </View>
        <View style={{ height: 150 }}></View>
        <Text style={styles.SaveText}>Scan Smart {"\n"} Work Faster</Text>
        <View style={{ height: 50 }}></View>
       <Link href={'/Signin'} asChild>
        <TouchableOpacity
          style={styles.button}
          >
            
            
            <Text style={styles.buttonText}>Get Started</Text>
            
            </TouchableOpacity></Link>

       
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      height: height,
      width: width,
      backgroundColor: "#fff",
      alignItems: "center",
    },
    ManImage: {
      height: 360,
      width: 360,
      top: 100,
    },
    SaveText: {
      fontSize: 30,
      textAlign: "center",
      fontWeight: "900",
      color: "#438883",
    },
    theButton:{
       height: '100%',
      width: '100%',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      paddingTop:20,
    },
    button: {
     height:60,
     width:300,
      backgroundColor: "#69AEA9",
      borderRadius: 50,
      shadowOffset: { width: 5, height: 5 },
      shadowColor: "gray",
      shadowOpacity: 0.3,
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    },
    buttonText: {
      fontSize: 17,
      fontWeight: "700",
      color: "white",
      textAlign:'center',
      
    },
  });
  