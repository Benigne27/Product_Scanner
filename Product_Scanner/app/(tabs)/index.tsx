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

interface Product {
  id: number;
  image: ImageData;
  item_name: string;
  selling_price: number;
  category: string
}

export default function HomeScreen() {
  const [searchText, setSearchText] = useState<string>("");
  const [searchData, setSearchData] = useState<Product[]>([]);
  const [searchCard, setSearchCard] = useState<Product[]>([]);

  const {addItems, addedItems, removeItems}= useAppContext()

  // const products: Product[] = [
  //   {
  //     id: 1,
  //     image: require("../../assets/images/cake.jpg"),
  //     name: "Chocolate Cake",
  //     price: "5.07",
  //   },
  //   {
  //     id: 2,
  //     image: require("../../assets/images/nutella.jpg"),
  //     name: "Nutella",
  //     price: "3.01",
  //   },
  //   {
  //     id: 3,
  //     image: require("../../assets/images/perfume.jpg"),
  //     name: "Perfume Fragrance",
  //     price: "4.50",
  //   },
  //   {
  //     id: 4,
  //     image: require("../../assets/images/wine.jpg"),
  //     name: "Raylee Wine",
  //     price: "15.95",
  //   },
  // ];

  const theProducts = () => {
    fetch("https://inventory2-drpa.onrender.com/stocks/")
      .then((response) => response.json())
      .then((response) => {
        setSearchCard(response);
        console.log(response)
      })
      .catch((error) => console.error(error));
     
  };

  const Searching = () => {
    if (searchText.length > 0) {
      const filtering = searchCard.filter((item) => {
        return item.item_name.toLowerCase().includes(searchText.toLowerCase());
      });
      setSearchData(filtering);
    } else {
      setSearchData([]);
    }
  };

  useEffect(() => {
    Searching();
    theProducts();
  }, [searchText]);
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
                  />
                  <View style={{ height: 10 }}></View>
                </View>
              ))}
            </>
          ) : (
            <>
              {searchCard.map((item, index) => (
                <View key={index}>
                  <ProdCard
                    image={item.image}
                    name={item.item_name}
                    price={item.selling_price}
                    category={item.category}
                    icon={'plus'}
                    onPress={addItems}
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
