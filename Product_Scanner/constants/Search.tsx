import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

type searchProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

const Search = ({ placeholder, value, onChangeText }: searchProps) => {
  return (
    <View>
      <TextInput
      style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={'gray'}
        value={value}
        onChangeText={onChangeText}
        theme={{roundness:15, colors:{primary:'#5CE1CD'}}}
        underlineColor="transparent"
        underlineStyle={{backgroundColor:'transparent'}}
        right={<TextInput.Icon icon={'magnify'} color={'gray'}/>}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
    input:{
        width:360,
        backgroundColor:'#f1f1f1',
        borderRadius:15
    }
});
