import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {Icon} from 'react-native-elements'
import { View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle:{backgroundColor:'white', height:80},
        headerShown: false,
        tabBarShowLabel:false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) =>  focused ? (
            <View
              style={{
                height: 40,
                width: 40,
                backgroundColor: "#D0EDFB",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 6,
              }}
            >
              <Icon
                name="home-variant-outline"
                type="material-community"
                size={30}
                color={"#5CE1CD"}
              />
            </View>
          ) : (
            <Icon name="home-variant-outline" type="material-community" size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="Scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: "#F6E3DB",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 6,
                }}
              >
                <Icon name="barcode-scan" type="material-community" color={'#F08F5F'}/>
              </View>
            ) : (
              <Icon name="barcode-scan" type="material-community" />
            ),
        }}
      />
    </Tabs>
  );
}
