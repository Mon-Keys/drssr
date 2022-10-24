import React, { useRef } from "react";

import {StyleSheet, Image, SafeAreaView, Pressable} from "react-native";

import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import CustomImagePicker from "../components/ImagePicker";
// @ts-ignore
import ExpoDraw from 'expo-draw'
import { AntDesign } from '@expo/vector-icons';
import { Text, View } from "../components/Themed";
import {RootTabScreenProps} from "../types";
import StyledButton from "../components/StyledButton";
import Cheap from "../components/Cheap"
import * as ImagePicker from "expo-image-picker";
import Colors from "../constants/Colors";

export default function WardrobeScreen({ navigation }: RootTabScreenProps<'Wardrobe'>) {
    enum Selector {
        Items,
        Looks
    }

    const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
    const snapPoints = React.useMemo(() => ["40%"], []);



    const [selected, setSelected] = React.useState<Selector>(Selector.Items);

    const openModal = () => {
        // @ts-ignore
        bottomSheetModalRef.current.present();
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result)

        // if (!result.cancelled) {
        //     setImage(result);
        // }
    }

  return (
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
            <View style={styles.cheapContainer}>
              <Cheap isActive={selected===Selector.Items} title={'Мои вещи'} onPress={()=>{
                  setSelected(Selector.Items)
                  console.log("items")
              }} />
              <Cheap isActive={selected===Selector.Looks} title={'Мои луки'} onPress={()=>{
                  setSelected(Selector.Looks)
                  console.log("looks")
              }} />
            </View>
            <View>
                <Pressable onPress={openModal}>
                    <AntDesign name="pluscircle" size={36} color={Colors.base.white} />
                </Pressable>
            </View>

          <CustomImagePicker />
          <StyledButton title={'экран'} onPress={()=> {
            navigation.navigate('Edit')
          }}/>
        </SafeAreaView>
          <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              style={styles.bottomSheet}
              backgroundStyle={{ backgroundColor: Colors.base.black}}
              handleIndicatorStyle={{backgroundColor: Colors.base.white}}
          >
              <View style={styles.contentContainer}>
                  <StyledButton title={'Из ссылки'} />
                  <StyledButton title={'Камера'} onPress={() => {
                      navigation.navigate("ImageRecognizer")
                  }}/>
                  <StyledButton title={'Из библиотеки'} onPress={pickImage}/>
                  <StyledButton title={'Найти'} />
              </View>
          </BottomSheetModal>
      </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
    cheapContainer: {
      flex: 1,
        flexDirection: "row",
    },
    bottomSheet: {
        backgroundColor: Colors.base.black
    },
    contentContainer: {
      backgroundColor: Colors.base.black,
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around"
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        justifyContent: 'flex-end',
    },
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
