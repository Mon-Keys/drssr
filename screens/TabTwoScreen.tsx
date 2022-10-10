import { StyleSheet, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import ImageMasker from '../components/ImageMasker';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <ImageMasker
        imgURI="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
        maskURI="https://pngimg.com/uploads/love/love_PNG85.png"
      />
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
