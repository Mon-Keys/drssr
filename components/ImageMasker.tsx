import React, { FC } from "react";

import MaskedView from "@react-native-masked-view/masked-view";

import { StyleSheet, Image,Text, View } from "react-native";

export type ImageMaskerProps = {
  img: string;
  maskimg: string;
}
const ImageMasker: React.FC<ImageMaskerProps> = ({img, maskimg}) => {
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
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
              source={{
                uri: "https://pngimg.com/uploads/love/love_PNG85.png",
              }}
            />
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: 0.3
              }}
            >
            </View>
          </View>
        }
      >
        <Image
          style={{ width: '100%', height: '100%', opacity: 1 }}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
          }}
        />
      </MaskedView>
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default ImageMasker