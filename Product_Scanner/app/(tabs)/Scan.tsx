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
// import QRCodeScanner from 'react-native-qrcode-scanner'
// import { RNCamera } from "react-native-camera";
import {Camera, CameraView} from 'expo-camera'
// import {BarCodeScanner} from 'expo-barcode-scanner'


const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

type BarCodeScannedEvent = {
    type: string; 
    data: string; 
  };

export default function Scan() {
    const [hasPermission, setHasPermission] = useState<boolean|null>(null);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState('');

    useEffect(()=>{
        (async()=>{
            const {status}=await Camera.requestCameraPermissionsAsync();
            setHasPermission(status==='granted')
        })()
    },[])

    const handleBarCodeScanned = ({ type, data }: BarCodeScannedEvent) => {
        setScanned(true);
        setScannedData(data);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      };
      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }

    return (
        <View style={styles.ScanMain}>
            <SafeAreaView></SafeAreaView>
           <CameraView onBarcodeScanned={scanned? undefined: handleBarCodeScanned}
           style={StyleSheet.absoluteFill}/>

      {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
      )}

      <Text>Scanned Data: {scannedData}</Text>
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
