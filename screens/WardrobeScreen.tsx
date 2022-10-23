import React, { useRef } from "react";

import { StyleSheet, Image, SafeAreaView } from "react-native";
import ImageMasker from "../components/ImageMasker";
import CustomImagePicker from "../components/ImagePicker";

// @ts-ignore
import ExpoDraw from 'expo-draw'

import { Text, View } from "../components/Themed";
import {RootTabScreenProps} from "../types";
import StyledButton from "../components/StyledButton";

export default function WardrobeScreen({ navigation }: RootTabScreenProps<'Wardrobe'>) {

  return (
    <View style={styles.container}>
      <CustomImagePicker />
      <StyledButton title={'экран'} onPress={()=> {
        navigation.navigate('Edit')
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
