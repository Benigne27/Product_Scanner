import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const height=Dimensions.get('screen').height

const Profile = () => {
  return (
    <View style={styles.ProfileTab}>
        <SafeAreaView></SafeAreaView>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    ProfileTab:{
        height:height,
        paddingHorizontal:20
    }
})