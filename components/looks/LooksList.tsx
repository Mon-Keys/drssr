import { StyleSheet, FlatList, View, RefreshControlProps } from 'react-native';
import React from 'react';
import { LookCard } from './LookCard';
import { IGetLookData } from '../../network';
import { Layout } from '../../styles';
import { getUri } from '../../network/const';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    columnWrapper: {
        minWidth: 348,
        marginVertical: Layout.margins.small,
        justifyContent: 'flex-start'
    }
});

interface LooksListProps {
    looks: Array<IGetLookData>;
    onPressLookCard: (index: number) => void;
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
                renderItem={({ item, index }) => (
                    <LookCard
                        imgURI={getUri(item.img_path)}
                        callbackfn={() => props.onPressLookCard(item.id)}
                        name={item.description}
                    />
                )}
                refreshControl={props.refreshControl}
            />
        </View>
    );
};
