import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, TextInput } from "react-native-paper";
import { Link } from "expo-router";
import Input from "@/constants/Input";
import { SafeAreaView } from "react-native-safe-area-context";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Login() {
  return (
    <View>
      <ImageBackground
        source={require("../assets/images/BarScan.jpg")}
        style={styles.ImgBg}
      >
        <LinearGradient
          style={styles.OpacityBg}
          colors={["transparent", "black"]}
          start={[0, 0.1]}
          end={[0, 0.6]}
        >
          <SafeAreaView></SafeAreaView>
          <View>
            <Input
              placeholder="Employee name"
              icon="account-outline"
              secureTextEntry={false}
            />
            <Input
              placeholder="Employee ID"
              icon="id-card"
              secureTextEntry={false}
            />
            <Input placeholder="Password" icon="key-outline" secureTextEntry />
          </View>
        </LinearGradient>

        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: "#69AEA9",
            width: 300,
            borderRadius: 20,
            display: "flex",
            alignItems:'center',
            justifyContent:'center',
            paddingTop:10
          }}
        >
          <Link href={"/(tabs)"} style={{ height: "100%", width: "100%" }}>
            <Text style={styles.LogText}>Log In</Text>
          </Link>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  ImgBg: {
    height: height,
    width: width,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 170,
    // transform:[{rotate:'180deg'}]
  },
  OpacityBg: {
    height: height,
    width: width,
    opacity: 0.87,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  googleButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 350,
    backgroundColor: "white",
    borderRadius: 40,
    gap: 10,
  },
  google: {
    height: 30,
    width: 30,
  },
  Text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  SignText: {
    fontSize: 20,
  },
  LogButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 350,
    backgroundColor: "#69AEA9",
    borderRadius: 40,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "white",
    shadowOpacity: 0.4,
  },
  LogText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign:'center'
  },
});
