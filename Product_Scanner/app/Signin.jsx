import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, TextInput } from "react-native-paper";
import { Link } from "expo-router";
import Input from "@/constants/Input";
import { SafeAreaView } from "react-native-safe-area-context";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Login() {
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [sender, setSender]=useState('')
  const socket= useRef(null)
   

  useEffect(() => {
    socket.current = new WebSocket("ws://192.168.222.61:8765");
    socket.current.onopen = () => {
      console.log("Connection is on");
      socket.current.send("Hello there!");
    };

    socket.current.onmessage = (event) => {
      console.log("New Incoming Message", event.data);
      setMessage(event.data);
    };

    socket.current.onclose = () => {
      console.log("Connection closed");
    };

    socket.current.onerror = (error) => {
      console.error("Socket error:", error);
    };

    // return () => {
    //   socket.current.close();
    // };
  }, [sender]);

  const sendMessage = () => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      const messageFormat=`${sender}##${input}`
      socket.current.send(messageFormat)
      setInput("");
    } else {
      console.log("Failed");
    }
  };
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
        <Text style={{color:'white', fontSize:20}}>{message}</Text>
          </View>
          <View>
            <Input
              placeholder="Username"
              icon="account-outline"
              secureTextEntry={false}
              value={sender}
              onChangeText={setSender}
            />
            <Input
              placeholder="Employee ID"
              icon="id-card"
              secureTextEntry={false}
              value={input}
              onChangeText={setInput}
            />
            <Input placeholder="Password" icon="key-outline" secureTextEntry />
          </View>
        </LinearGradient>
        {/* <Link href={"/(tabs)"} asChild> */}
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: "#69AEA9",
              width: 300,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={sendMessage}
          >
            <Text style={styles.LogText}>Try</Text>
          </TouchableOpacity>
          <View style={{height:20}}></View>
          <Link href={"/(tabs)"} asChild>
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: "#69AEA9",
              width: 300,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={sendMessage}
          >
            <Text style={styles.LogText}>Log In</Text>
          </TouchableOpacity>
          </Link>
        {/* </Link> */}
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
    textAlign: "center",
  },
});
