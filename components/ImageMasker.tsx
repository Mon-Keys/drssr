import React, { useState } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";

// @ts-ignore
import ExpoDraw from "expo-draw";

import MaskedView from "@react-native-masked-view/masked-view";

export type Props = {
  imgURI: string;
  maskURI: string;
  opacity?: number 
};

const ImageMasker: React.FC<Props> = ({ imgURI, maskURI, opacity=0.5 }) => {
  const [strokesData, setStrokes] = useState<any>({})

  return (
    <View style={styles.container}>
      <MaskedView
        style={{ flex: 1, flexDirection: "row", height: "100%" }}
        maskElement={
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
              source={{
                uri: maskURI,
              }}
            />
          </View>
        }
      >
        <Image
          style={{ width: "100%", height: "100%", opacity: 1 }}
          source={{
            uri: imgURI,
          }}
        />
      </MaskedView>
      <Image
        style={{
          width: "100%",
          height: "100%",
          opacity: opacity,
          position: "absolute",
        }}
        source={{
          uri: imgURI,
        }}
      />
      <ExpoDraw
        strokes={[strokesData]}
        containerStyle={{
          backgroundColor: "transparent",
          height: "100%",
          width: "100%",
          position: "absolute",
        }}
        color={"red"}
        strokeWidth={4}
        enabled={true}
      />
      <ExpoDraw
        strokes={[]}
        containerStyle={{
          backgroundColor: "transparent",
          height: "100%",
          width: "100%",
          position: "absolute",
        }}
        color={"transparent"}
        strokeWidth={4}
        enabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
 
});

export default ImageMasker;
