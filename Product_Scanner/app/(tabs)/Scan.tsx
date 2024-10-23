"use strict";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  Button,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { Camera, CameraView } from "expo-camera";
import axios from "axios";
import Modal from "react-native-modal";
import { SwipeablePanel } from "rn-swipeable-panel";
import ProdCard from "@/constants/ProdCard";
import { useAppContext } from "../Context/ContextAuth";
// import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import FlashMessage from "react-native-flash-message";
import RadioButton from "@/constants/RadioButton";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

type BarCodeScannedEvent = {
  type: string;
  data: string;
};

export default function Scan() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [scannnedList, setScannedList] = useState<
    Array<{ id: string; data: string }>
  >([]);
  const { addedItems, removeItems } = useAppContext();
  const [isPanelActive, setIsPanelActive] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const {totalAmount}=useAppContext()

  const handleSelectOption = (option: string) => {
    setSelectedId(option);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: BarCodeScannedEvent) => {
    setScanned(true);

    setModalVisible(!modalVisible);

    if (!scannnedList.some((product) => product.data === data)) {
      setScannedList((prevProd) => [
        ...prevProd,
        { id: `${prevProd.length}`, data },
      ]);
      console.log(scannnedList);
    }
    setTimeout(() => {
      setScanned(false);
    }, 2000);
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const openPanel = () => {
    setIsPanelActive(true);
  };
  const closePanel = () => {
    setIsPanelActive(false);
  };

  return (
    <View style={styles.ScanMain}>
      <FlashMessage />
      <SafeAreaView></SafeAreaView>
      <Modal isVisible={modalVisible}>
        <TouchableOpacity
          style={{
            height: 35,
            width: 35,
            backgroundColor: "white",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Icon name="chevron-left" size={35} color={"#5A6CF3"} />
        </TouchableOpacity>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 200, width: 300, alignSelf: "center" }}
          zoom={0.01}
        />
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible);
          setScanned(false);
        }}
        style={{
          height: 50,
          width: 50,
          backgroundColor: "white",
          alignSelf: "flex-end",
          borderRadius: 25,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          name="qrcode-scan"
          type="material-community"
          size={30}
          color={"#69AEA9"}
        />
      </TouchableOpacity>

      <View style={{ height: 30 }}></View>

      {/* {scannnedList.length > 0 ? (
        <>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Scanned Data:
          </Text>
          <View style={{ height: 30 }}></View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {scannnedList.map((item, index) => (
              <View>
                <View
                  style={{
                    width: 350,
                    paddingVertical: 20,
                    backgroundColor: "white",
                    paddingHorizontal: 20,
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                  key={index}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                    {item.data}
                  </Text>
                </View>
                <View style={{ height: 10 }}></View>
              </View>
            ))}
          </ScrollView>
          <View
            style={{
              height:70,
              width:width,
              backgroundColor:'#F6E3DB',
              position: "absolute",
              display:'flex',
              alignItems: "center",
              justifyContent: "center",
             
              top: height - 150,
            }}
          >
            <TouchableOpacity style={{
              height: 50,
              width: 350,
              backgroundColor: "#69AEA9",
              display:'flex',
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              
            }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, color: "white" }}
              >
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: height - 300,
          }}
        >
          <Image
            source={require("../../assets/images/magnifier.png")}
            style={{ height: 250, width: 250 }}
          />
          <Text style={{ fontSize: 20, fontWeight: "500", color: "gray" }}>
            No Products Scanned or Added yet!
          </Text>
        </View>
      )} */}

      {addedItems.length > 0 ? (
        <>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Your Products:
          </Text>
          <View style={{ height: 30 }}></View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {addedItems.map((item, index) => (
              <View key={index}>
                <ProdCard
                  image={item.image}
                  name={item.item_name}
                  price={item.selling_price}
                  category={item.category}
                  icon={"minus"}
                  onPress={removeItems}
                  product={item}
                />
                <View style={{ height: 10 }}></View>
              </View>
            ))}
          </ScrollView>
          <View
            style={{
              height: 70,
              width: width,
              backgroundColor: "#F6E3DB",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              top: height - 150,
            }}
          >
            <TouchableOpacity
              style={{
                height: 50,
                width: 350,
                backgroundColor: "#69AEA9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
              onPress={openPanel}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 20, color: "white" }}
              >
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: height - 300,
            }}
          >
            <Image
              source={require("../../assets/images/magnifier.png")}
              style={{ height: 250, width: 250 }}
            />
            <Text style={{ fontSize: 20, fontWeight: "500", color: "gray" }}>
              No Products Scanned or Added yet!
            </Text>
          </View>
        </>
      )}
      <SwipeablePanel
        isActive={isPanelActive}
        onClose={closePanel}
        fullWidth
        onlySmall
        showCloseButton
        closeRootStyle={{ height: 40, width: 40, backgroundColor: "#5A6CF3" }}
       style={{paddingHorizontal:20}}
      >
        <View>
          <RadioButton
            label="Momo Pay"
            image={require("@/assets/images/MomoPay.png")}
            selected={selectedId === "Momo Pay"}
            onPress={() => handleSelectOption("Momo Pay")}
          />
          <RadioButton
            label="Cash"
            image={require("@/assets/images/Cash.png")}
            selected={selectedId === "Cash"}
            onPress={() => handleSelectOption("Cash")}
          />
        </View>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: "#69AEA9",
            width: 300,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignSelf:'center',
            marginTop:20
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Pay ({totalAmount} RWF)
          </Text>
        </TouchableOpacity>
      </SwipeablePanel>
    </View>
  );
}

const styles = StyleSheet.create({
  ScanMain: {
    backgroundColor: "#F6E3DB",
    height: height,
    paddingHorizontal: 20,
  },
  IconHolder: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: "white",
  },
});
