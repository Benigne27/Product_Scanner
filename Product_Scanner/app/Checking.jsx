import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { LinearGradient } from "expo-linear-gradient";
  import { SafeAreaView } from "react-native-safe-area-context";
  import Input from "@/constants/Input";
  import { Link } from "expo-router";
  
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;
  
  export default function Login() {
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("Not connected");
    const [cred, setCred] = useState("");
    const [ws, setWs] = useState(null);
    const [receivedMessage,setReceivedMessage]=useState('')
    // const socket= useRef(null)
  
  
    // useEffect(() => {
    //   socket.current = new WebSocket("ws://192.168.222.61:8765");
    //   socket.current.onopen = () => {
    //     console.log("Connection is on");
    //     socket.current.send("Hello there!");
    //   };
  
    //   socket.current.onmessage = (event) => {
    //     const message = event.data;
    //     const [sender, content] = message.split("##"); 
    //     setReceivedMessage(${sender}: ${content}); 
    //   };
  
    //   socket.current.onclose = () => {
    //     console.log("Connection closed");
    //   };
    //   socket.current.onerror = (error) => {
    //     console.error("Socket error:", error);
    //   };
  
    //   return () => {
    //     socket.current.close();
    //   };
    // }, []);
  
    // const sendMessage = () => {
    //   if (socket.current || socket.current.readyState === WebSocket.OPEN) {
    //     try {
    //       const messageFormat=${username}<>${recipients}#${input}
    
    //     socket.current.send(messageFormat)
    //     console.log("Sending message: ", messageFormat);
    
    //     } catch (error) {
    //       console.log('Error while sending:', error);
          
    //     }
        
    //   } else {
    //     console.log("Failed");
    //   }
    // };
  
  
    // Function to authenticate the user using only the username
    const authenticate = async () => {
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
        setCred(ans.detail);
  
        // If verification is successful
        if (ans.detail === "Verification successful") {
          setStatus("Authenticated");
          sendMessageThroughWebSocket();
        } else {
          setStatus("Authentication Failed");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    };
  
    // Function to send a message through WebSocket
    const sendMessageThroughWebSocket = () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        const message = `${username}<>${'me'}#${'Hellooo'}`;
        try {
        ws.send(message);
        } catch (error) {
          console.error(error);
          
        }
        console.log("Sending WebSocket message:", message);
      } else {
        console.error("WebSocket is not connected.");
      }
    };
  
    // WebSocket setup
    useEffect(() => {
      const socket = new WebSocket("ws://192.168.222.61:8765");
  
      socket.onopen = () => {
        console.log("WebSocket connection established.");
        setWs(socket);
      };
  
      socket.onclose = () => {
        console.log("WebSocket connection closed.");
      };
  
      socket.onerror = (e) => {
        console.error("WebSocket error:", e.message);
      };
      socket.onmessage = (event) => {
            const message = event.data;
            const [sender, content] = message.split("##"); 
            setReceivedMessage(`${sender}: ${content}`); 
          };
  
      return () => {
        socket.close();
      };
    }, []);
  
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
              <Text style={{ color: "white", fontSize: 20 }}>Status: {status}</Text>
              <Text style={{ color: "white", fontSize: 20 }}>Message: {receivedMessage}</Text>
            </View>
            <View>
              <Input
                placeholder="Username"
                icon="account-outline"
                secureTextEntry={false}
                value={username}
                onChangeText={setUsername}
              />
            </View>
          </LinearGradient>
          <TouchableOpacity
            style={styles.AuthButton}
            onPress={authenticate}
          >
            <Text style={styles.LogText}>Authenticate</Text>
          </TouchableOpacity>
          <Link href={"/(tabs)"} asChild>
            <TouchableOpacity style={styles.AuthButton}>
              <Text style={styles.LogText}>Log In</Text>
            </TouchableOpacity>
          </Link>
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
    LogText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    AuthButton: {
      height: 50,
      backgroundColor: "#69AEA9",
      width: 300,
      borderRadius: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 10,
    },
  });
  