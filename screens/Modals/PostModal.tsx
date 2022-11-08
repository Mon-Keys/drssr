import React from 'react';
import {
    StyleSheet,
    Text,
    Platform,
    StatusBar
} from 'react-native';
import { View } from '../../components/base/Themed';
import Colors from '../../constants/Colors';
import {RootStackScreenProps} from "../../types";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.base.black,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
});

export default function PostModalScreen({
    navigation
}: RootStackScreenProps<'Post'>) {

    return (
        <View style={styles.container}>
            <Text style={{color: 'white'}}>aga</Text>
        </View>
    );
}
