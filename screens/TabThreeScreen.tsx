import React, { useRef } from "react";

import { StyleSheet, Image, SafeAreaView } from "react-native";
import ImageMasker from "../components/ImageMasker";

// @ts-ignore
import ExpoDraw from 'expo-draw'

import { Text, View } from "../components/Themed";

export default function TabThreeScreen() {

  return (
    <View style={styles.container}>
      <ImageMasker
        style={{ position: "absolute " }}
        imgURI="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
        maskURI="https://pngimg.com/uploads/love/love_PNG85.png"
      />
      <ExpoDraw
        strokes={[]}
        containerStyle={{
          backgroundColor: "transparent",
          height: "100%",
          width: "100%",
          position: "absolute",
        }}
        color={"red"}
        strokeWidth={8}
        enabled={true}
      />
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
