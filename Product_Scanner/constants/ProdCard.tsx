import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { Product } from "@/app/Context/ContextAuth";
type cardProps = {
  image: ImageData;
  name: string;
  price: number;
  category: string,
  icon: string,
  product: Product,
  onPress: (product: Product)=>void
};

const ProdCard = ({ image, name, price, category, onPress, product, icon }: cardProps) => {
  return (
    <View style={styles.CardMain}>
      <View style={styles.CardMain2}>
      <View style={{ height: 80, width: 80 }}>
        <Image
          source={image}
          style={{ height: "100%", width: "100%" }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.prodDetails}>
        <Text style={styles.prodName}>Name: {name}</Text>
        <Text style={styles.prodCategory}>Category: {category}</Text>
        <Text style={styles.prodPrice}>{price} RWF</Text>
      </View>
      </View>
      

      <TouchableOpacity 
      onPress={()=>onPress(product)}
        style={{
          height: 35,
          width: 35,
          borderRadius: 6,
          backgroundColor: "#5A6CF3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        
      >
        <Icon name={icon} size={30} color="white" type="material-community"/>   
        
      </TouchableOpacity>
    </View>
  );
};

export default ProdCard;

const styles = StyleSheet.create({
  CardMain: {
    height: 100,
    width: 380,
    backgroundColor: "#f1f1f1",
    shadowOffset: { height: 4, width: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.2,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 5,
  },
  CardMain2:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width:300,
    gap:10
  },
  prodDetails:{
    gap:10
  },
  prodName: {
    fontSize: 15,
    fontWeight: "500",
  },
  prodCategory: {
    fontSize: 14,
    fontWeight: "400",
  },
  prodPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color:'#F08F5F'
  },
});
