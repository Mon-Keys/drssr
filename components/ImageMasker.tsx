import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import MaskedView from '@react-native-masked-view/masked-view';

export type Props = {
    imgURI: string;
    maskURI: string;
    opacity?: number;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    maskedView: { flex: 1, flexDirection: 'row', height: '100%' },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    maskElement: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageMaskedView: { width: '100%', height: '100%', opacity: 1 }
});

const ImageMasker: React.FC<Props> = ({ imgURI, maskURI, opacity = 0.3 }) => {
    // const [strokesData, setStrokes] = useState<any>({});

    return (
        <View style={styles.container}>
            <MaskedView
                style={styles.maskedView}
                maskElement={
                    <View style={styles.maskElement}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: maskURI
                            }}
                        />
                    </View>
                }
            >
                <Image
                    style={styles.imageMaskedView}
                    source={{
                        uri: imgURI
                    }}
                />
            </MaskedView>
            <Image
                style={{ ...styles.image, opacity: opacity }}
                source={{
                    uri: imgURI
                }}
            />
        </View>
    );
};

export default ImageMasker;
