import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Input from "@/constants/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";

const Log = () => {
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  let socket;

  useEffect(() => {
    socket = new WebSocket("ws://192.168.222.61:8765");
    socket.onopen = () => {
      console.log("Connection is on");
      socket.send("Hello there!");
    };

    socket.onmessage = (event) => {
      console.log("New Incoming Message", event.data);
      setMessage(event.data);
    };

    socket.onclose = () => {
      console.log("Connection closed");
    };

    socket.onerror = (error) => {
      console.error("Socket error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(input)
      setInput("");
    } else {
      console.log("Failed");
    }
  };

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SafeAreaView></SafeAreaView>

      <View style={{height:100}}>
        <Text style={{color:'white'}}>{message}</Text>
      </View>
      <TextInput
        style={{ height: 100, width: 350 }}
        placeholder="Your message..."
        value={input}
        onChangeText={setInput}
      />
      <View style={{ height: 30 }}></View>
      <TouchableOpacity
        style={{
          height: 50,
          width: 200,
          backgroundColor: "teal",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}

        onPress={sendMessage}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Send Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Log;

const styles = StyleSheet.create({});
