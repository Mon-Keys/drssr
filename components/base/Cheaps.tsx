import React, { ReactElement } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Colors from '../../constants/Colors';
import Cheap from './Cheap';

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
        flexDirection: 'row',
        backgroundColor: Colors.base.black
    }
});

const Cheaps = (props: CheapsProps) => {
    const [chosenCheap, setChosenCheap] = React.useState(props.cheaps[0].name);
    return (
        <View style={styles.cheapContainer}>
            <FlatList
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
    );
};

export default Cheaps;
