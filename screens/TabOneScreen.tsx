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
            <Image
              style={{ width: 200, height: 200 }}
              source={{
                uri: "https://pngimg.com/uploads/love/love_PNG85.png",
              }}
            />
          </View>
        }
      >
        {/* Shows behind the mask, you can put anything here, such as an image */}
        <Image
          style={{ width: 200, height: 400 }}
          source={{
            uri: "https://c.tenor.com/wsChytFfrS4AAAAM/monki-flip-monkey.gif",
          }}
        />
      </MaskedView>
      <Text style={styles.title}>Tab 1</Text>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: "https://c.tenor.com/wsChytFfrS4AAAAM/monki-flip-monkey.gif",
        }}
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
