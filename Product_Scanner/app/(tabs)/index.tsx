import {
  Image,
  StyleSheet,
  Platform,
  View,
  Dimensions,
  ScrollView,
  Pressable,
  Text,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useContext, useEffect, useState } from "react";
import ProdCard from "../../constants/ProdCard";
import Search from "@/constants/Search";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAppContext } from "../Context/ContextAuth";





const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;



export default function HomeScreen() {
 

  const {addItems, productList, searchText, searchData, setSearchText}= useAppContext()

  
  
  return (
    <View style={styles.background}>
      <StatusBar style="dark" />
      <SafeAreaView></SafeAreaView>
      <Search
        placeholder="Search Products..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <View style={{ height: 30 }}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 30 }}></View>
        <View style={{ width: width, display: "flex", alignItems: "center" }}>
          {searchText.length > 0 ? (
            <>
              {searchData.map((item, index) => (
                <View key={index}>
                  <ProdCard
                    image={item.image}
                    name={item.item_name}
                    price={item.selling_price}
                    category={item.category}
                    icon={'plus'}
                    onPress={addItems}
                    product={item}
                  />
                  <View style={{ height: 10 }}></View>
                </View>
              ))}
            </>
          ) : (
            <>
              {productList.map((item, index) => (
                <View key={index}>
                  <ProdCard
                    image={item.image}
                    name={item.item_name}
                    price={item.selling_price}
                    category={item.category}
                    icon={'plus'}
                    onPress={addItems}
                    product={item}
                  />
                  <View style={{ height: 10 }}></View>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    height: height,
    width: width,
    display: "flex",
    alignItems: "center",
  },
});
