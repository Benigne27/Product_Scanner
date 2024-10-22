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
import { Link, useRouter } from "expo-router";
import Input from "@/constants/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import {showMessage, hideMessage} from 'react-native-flash-message'

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Login() {
  const [employeeId, setEmployeeId] = useState("");
  const [username, setUsername]=useState('')
  const [password, setPassword] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(""); 
  const socket= useRef(null)
  const router=useRouter()
  const [status, setStatus] = useState("Not connected");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentDateTime, setCurrentDateTime]=useState({
    date:'',
    time:''
  })
   

  useEffect(() => {
    const theDateTime=()=>{
      const date=new Date()
      const theDate=date.toLocaleDateString()
      const theTime=date.toLocaleTimeString()
      setCurrentDateTime({date:theDate, time:theTime})
      console.log(`The time is: ${theTime} at ${theDate}`);
      
    }
    theDateTime()

  

    socket.current = new WebSocket("ws://192.168.222.61:8765");
    socket.current.onopen = () => {
      console.log("Connection is on");
      socket.current.send("Hello there!");
    };

    socket.current.onmessage = (event) => {
      const message = event.data;
      const [sender, content] = message.split("##"); 
      setReceivedMessage(`${sender}: ${content}`); 
    };

    socket.current.onclose = () => {
      console.log("Connection closed");
    };
    socket.current.onerror = (error) => {
      console.error("Socket error:", error);
    };

    return () => {
      socket.current.close();
      
    };
  }, []);

  const sendMessage = () => {
    if (socket.current || socket.current.readyState === WebSocket.OPEN) {
      try {
        const logTime=`Logged in on: ${currentDateTime.date} at ${currentDateTime.time}`
        const messageFormat=`${username}<>${'me'}#${logTime}`
        
      socket.current.send(messageFormat)
      console.log("Sending message: ", messageFormat);
  
      } catch (error) {
        console.log('Error while sending:', error);
        
      }
      
    } else {
      console.log("Failed");
    }
  };

  const authenticate=async()=>{
    if (!username) {
      alert("Please enter your username");
      return;
    }
    const authData = {
      username: username.trim(),
    };

    try {
      const response = await fetch("http://192.168.222.61:8001/user/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Fetch error response
      console.error("Error during authentication:", errorData);
      throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message}`);
      }

      const ans = await response.json();
      

      // If verification is successful
      if (ans.detail === "Verification successful") {
        setStatus("Authenticated");
        setIsAuthenticated(true)
        sendMessage();
        router.push('/(tabs)')
      } else {
        setStatus("Authentication Failed");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  }
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
        {/* <Text style={{color:'white', fontSize:20}}>{receivedMessage}</Text>
        <Text style={{color:'white', fontSize:20}}>Status: {status}</Text> */}
          </View>
          <View>
         
            <Input
              placeholder="Username"
              icon="account-outline"
              secureTextEntry={false}
              value={username}
              onChangeText={setUsername}
            />
            <Input
              placeholder="Employee ID"
              icon="id-card"
              secureTextEntry={false}
              value={employeeId}
              onChangeText={setEmployeeId}
            />
            <Input placeholder="Password" icon="key-outline" secureTextEntry 
            value={password}
            onChangeText={setPassword}/>
          </View>
        </LinearGradient>
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
            onPress={authenticate}
          >
            <Text style={styles.LogText}>Login</Text>
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