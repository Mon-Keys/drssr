import { StyleSheet } from 'react-native';
import React from "react"
import { Text, View } from '../components/Themed';
import {RootTabScreenProps} from "../types";

export default function DiscoverScreen({ navigation }: RootTabScreenProps<'Search'>) {
    return (
        <View style={styles.container}>
            <Text> Discover this </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red",
        alignContent: "center",
        justifyContent: "center"
    },
});
