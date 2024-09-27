"use strict";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { Camera, CameraView } from "expo-camera";
import axios from "axios";
import Modal from "react-native-modal";

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

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarCodeScannedEvent) => {
    setScanned(true);
    setScannedData(data);
    setModalVisible(!modalVisible);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // const prodDetails=async()=>{
  //   try {
  //     const response= await axios.get(`https://api.barcodelookup.com/v3/products?barcode=${scannedData}&formatted=y&key=ifDzhmKslKav42OD93NE`)
  //   } catch (error) {

  //   }
  // }
  return (
    <View style={styles.ScanMain}>
      <SafeAreaView></SafeAreaView>
      <Modal isVisible={modalVisible}>
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
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Scanned Data:</Text>

      {scanned && (
        <>
          <View style={{ height: 30 }}></View>
          <View
            style={{
              width: 350,
              paddingVertical: 20,
              backgroundColor: "white",
              paddingHorizontal: 20,
              justifyContent: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 17 }}>
              {scannedData}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              height: 50,
              width: 350,
              backgroundColor: "#69AEA9",
              alignItems: "center",
              justifyContent: "center",
              borderRadius:10,
              position:'absolute',
              alignSelf:'center',
              top:height-150
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
              Checkout
            </Text>
          </TouchableOpacity>
        </>
      )}
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
