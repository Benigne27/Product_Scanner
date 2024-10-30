import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

type scanConstants={
    placeholder:string,
    icon: string,
    secureTextEntry:boolean,
    value: string,
    onChangeText: (text: string)=>void
}

export default function Input({placeholder, icon, secureTextEntry, value, onChangeText}: scanConstants) {
  return (
    <View>
      <TextInput
        style={styles.Input}
        theme={{ roundness: 20, colors: { primary: "#69AEA9" } }}
        underlineStyle={{backgroundColor:'transparent'}}
        underlineColor="transparent"
        placeholder={placeholder}
        placeholderTextColor={'gray'}
        textColor="white"
        cursorColor="#69AEA9"
        clearTextOnFocus={true}
        right={<TextInput.Icon icon={icon} color={'white'}/>}
        keyboardType="email-address"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}

      />
      <View style={{height:30}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  Input: {
    width: 300,
    height: 50,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "transparent",
    borderRadius: 20,
    fontSize:15,
    fontWeight:'bold',
    paddingHorizontal:20,
    color:'white'
  },
});
