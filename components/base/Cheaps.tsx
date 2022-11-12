import React, { ReactElement } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Cheap from './Cheap';
import {Colors} from "../../styles";

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
        backgroundColor: 'transparent'

    },
    separator: {
        marginVertical: 7,
        maxHeight: 300,  // чтобы занимал максимальную высоту
        width: 1,
        backgroundColor: Colors.base.darkgray,
    },

});

const Cheaps = (props: CheapsProps) => {
    const [chosenCheap, setChosenCheap] = React.useState(props.cheaps[0].name);
    return (
        <View style={styles.cheapContainer}>
            <View style={{  }} >
                <FlatList
                    ItemSeparatorComponent={() => (<View style={styles.separator} />)}
                    horizontal={true}
                    data={props.cheaps}
                    renderItem={({ item }) => {
                        return (
                            <Cheap
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
