import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  image: ImageData
}

const RadioButton= ({ label, selected, onPress, image }:RadioButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.radioCircle}>
        {selected ? <View style={styles.selectedRb} /> : null}
      </View>
      <Image source={image} style={styles.image}/>
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap:5
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#69AEA9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#69AEA9',
  },
  radioText: {
    fontSize: 16,
  },
  image:{
    height:50,
    width:50
  }
});

export default RadioButton;
