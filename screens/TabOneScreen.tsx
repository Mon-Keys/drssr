import { StyleSheet, Image } from 'react-native';


import MaskedView from "@react-native-masked-view/masked-view";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <MaskedView
        style={{ flex: 1, flexDirection: "row", height: "100%" }}
        maskElement={
          <View
            style={{
              // Transparent background because mask is based off alpha channel.
              backgroundColor: "transparent",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: .3
              }}
            >
            </View>
            <Image
              style={{
                width: '80%',
                height: '70%',
                position: 'absolute',
              }}
              source={{
                uri: "https://pngimg.com/uploads/love/love_PNG85.png",
              }}
            />
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
      <Text style={styles.title}>Tab 1</Text>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
