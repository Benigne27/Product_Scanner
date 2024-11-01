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
import Modal from "react-native-modal";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import { Icon } from "react-native-paper";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function HomeScreen() {
  const [visible, setVisible] = useState<boolean>(false);
  const {
    addItems,
    productList,
    searchText,
    searchData,
    setSearchText,
    isAuthenticated,
    username,
    logout,
  } = useAppContext();
  const router = useRouter();

  if (!isAuthenticated) {
    router.replace("/Signin");
  }


  return (
    <MenuProvider skipInstanceCheck>
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
          <Menu>
            <MenuTrigger
              children={
                <View style={styles.account}>
                  <Image
                    source={require("@/assets/images/account.png")}
                    style={styles.accountImage}
                  />
                </View>
              }
            />
            <MenuOptions
              optionsContainerStyle={{
                marginTop: 50,
                height: 70,
                width: 130,
                borderRadius: 10,
                alignItems:'center',
                justifyContent:'center'
              }}
            >
              <MenuOption onSelect={() => logout()} style={styles.menuOption}>
                <Icon source={"logout"} size={20} color="red" />
                <Text style={styles.optionText2}>Log Out</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
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
    </MenuProvider>
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
    height: "80%",
    width: "80%",
    borderRadius: 20,
  },
  modal: {
    height: 100,
    width: 100,
    backgroundColor: "#f1fdfd",
    position: "absolute",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowColor: "gray",
    alignSelf: "flex-end",
    top: 120,
    right: 0,
  },
  optionText: {
    fontSize: 16,
    padding: 10,
  },
  optionText2: {
    fontSize: 16,
    padding: 10,
    color: "red",
  },
  menuOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
