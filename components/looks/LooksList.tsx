import {StyleSheet, FlatList, View, FlatListProps, RefreshControlProps} from 'react-native';
import React from 'react';
import Colors from '../../styles/Colors';
import { LookCard } from './LookCard';
import { IGetLookData } from '../../network';
import {Layout} from "../../styles";
import {getUri} from "../../network/const";

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

interface LooksListProps {
    looks: Array<IGetLookData>;
    refreshControl?: React.ReactElement<RefreshControlProps>;
}

export const LookList = (props: LooksListProps) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={props.looks}
                numColumns={2}
                keyExtractor={(item) => `${item.description}`}
                columnWrapperStyle={styles.columnWrapper}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                renderItem={(item) => (
                    <LookCard
                        imgURI={getUri(item.item.img)}
                        callbackfn={() => {}}
                        name={item.item.description}
                    />
                )}
                refreshControl={props.refreshControl}
            />
        </View>
    );
};
