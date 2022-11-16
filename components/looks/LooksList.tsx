import { StyleSheet, FlatList, View, FlatListProps } from 'react-native';
import React from 'react';
import Colors from '../../styles/Colors';
import { LookCard } from './LookCard';
import { IGetLookData } from '../../network';

const styles = StyleSheet.create({
    wardrobeImageBackground: {
        backgroundColor: Colors.base.lightgray,
        borderRadius: 18,
        margin: 10
    },
    menuItemSize: { height: 100, width: 100 },
    container: {
        backgroundColor: 'transparent',
        alignContent: 'space-between',
        justifyContent: 'space-around'
    }
});

interface LooksListProps extends FlatListProps<IGetLookData> {
    navigation?: any;
    looks: Array<IGetLookData>;
}

export const LookList = (props: LooksListProps) => {
    return (
        <View style={styles.container}>
            <FlatList
                {...props}
                data={props.looks}
                numColumns={2}
                keyExtractor={(item) => `${item.description}`}
                contentContainerStyle={styles.container}
                renderItem={(item) => (
                    <LookCard
                        imgURI={`data:image /jpg;base64,${item.item.img}`}
                        callbackfn={() => {}}
                        name={item.item.description}
                    />
                )}
            />
        </View>
    );
};
