import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'


const height=Dimensions.get('screen').height
const width=Dimensions.get('screen').width

export default function Scan({navigation}) {
  return (
    <View style={styles.ScanMain}>
        <SafeAreaView></SafeAreaView>
      <TouchableOpacity style={styles.IconHolder} onPress={()=>navigation.goBack()}>
        <Icon source={'chevron-left'} size={30} color='#2F7E79'/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    ScanMain:{
        backgroundColor:'#F6E3DB',
        height:height,
        paddingHorizontal:20
    },
    IconHolder:{
        width:30,
        height:30,
        borderRadius:5,
        backgroundColor:'white'
    }
})