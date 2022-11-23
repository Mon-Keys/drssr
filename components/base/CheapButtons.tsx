import React, { ReactElement } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Cheap from './Cheap';
import { Colors } from '../../styles';
import CheapButton from './CheapButton';

export interface MenuItem {
    name: string;
    component: ReactElement<any, any>;
}

export interface CheapsProps {
    cheaps: Array<MenuItem>;
    currentScreen: (screen: ReactElement<any, any>) => void;
}

const styles = StyleSheet.create({
    cheapContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        height: 35
    }
});

const Cheaps = (props: CheapsProps) => {
    const [chosenCheap, setChosenCheap] = React.useState(props.cheaps[0].name);
    return (
        <View style={styles.cheapContainer}>
            <View>
                <FlatList
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={props.cheaps}
                    renderItem={({ item }) => {
                        return (
                            <CheapButton
                                name={item.name}
                                isActive={item.name === chosenCheap}
                                onPress={() => {
                                    setChosenCheap(item.name);
                                    props.currentScreen(item.component);
                                }}
                            />
                        );
                    }}
                />
            </View>
        </View>
    );
};

export default Cheaps;
