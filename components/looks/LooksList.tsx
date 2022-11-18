import { StyleSheet, FlatList, View, FlatListProps } from 'react-native';
import React from 'react';
import Colors from '../../styles/Colors';
import { LookCard } from './LookCard';
import { IGetLookData } from '../../network';
import {Layout} from "../../styles";

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    columnWrapper: {
        minWidth: 348,
        marginVertical: Layout.margins.small,
        justifyContent: 'flex-start'
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
                columnWrapperStyle={styles.columnWrapper}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                renderItem={(item) => (
                    <LookCard
                        // @ts-ignore
                        imgURI={`http://leonidperl.in${item.item.img_path}`}
                        callbackfn={() => {}}
                        name={item.item.description}
                    />
                )}
            />
        </View>
    );
};
