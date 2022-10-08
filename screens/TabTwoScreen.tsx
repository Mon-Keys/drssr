import { StyleSheet, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ImageMasker from '../components/ImageMasker';
import MaskedView from "@react-native-masked-view/masked-view";
import Hello from '../components/Image';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Hello imgURI='djasdasd'/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "100%"
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
