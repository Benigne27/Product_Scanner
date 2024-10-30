import {
  Image,
  StyleSheet,
  Platform,
  View,
  Dimensions,
  ScrollView,
  Pressable,
  Text,
  TouchableOpacity,
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
import { useRouter, Link } from "expo-router";
import FlashMessage from "react-native-flash-message";
import * as secureStore from "expo-secure-store";
import { Icon } from "react-native-paper";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function HomeScreen() {
  // const [username, setUsername]=useState('')
  const {
    addItems,
    productList,
    searchText,
    searchData,
    setSearchText,
    isAuthenticated,
    username,
  } = useAppContext();
  const router = useRouter();

  if (!isAuthenticated) {
    router.replace("/Signin");
  }

  return (
    <View style={styles.background}>
      <FlashMessage />
      <StatusBar style="dark" />
      <SafeAreaView></SafeAreaView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: width,
          paddingHorizontal: 20,
        }}
      >
        <View>
          <Text style={{ fontSize: 28, fontWeight: "bold" }}>
            Welcome, <Text style={{ color: "#5CE1CD" }}>{username}</Text>!
          </Text>
        </View>
        <View>
          <Link href={'/Profile'} asChild>
            <TouchableOpacity style={styles.account}>
              <Image
                source={require("@/assets/images/account.png")}
                style={styles.accountImage}
              />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      <View style={{ height: 20 }}></View>
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
                    icon={"plus"}
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
                    icon={"plus"}
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
  account: {
    height: 50,
    width: 50,
    borderColor: "#5CE1CD",
    borderWidth: 2,
    borderRadius: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  accountImage: {
    height: "90%",
    width: "90%",
    borderRadius: 25,
  },
});
