import React, { ReactElement } from 'react';

import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { View } from '../../components/base/Themed';
import Colors from '../../constants/Colors';
import Cheaps from '../../components/base/Cheaps';

import SubscriptionsFeedScreen from './SubscriptionsFeedScreen/SubscriptionsFeedScreen';
import SavedHomeScreen from './SavedScreen/SavedScreen';
import { RootTabScreenProps } from '../../types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.base.black,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    cheapContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.base.black
    },
    mainContainer: {
        flex: 10,
        backgroundColor: Colors.base.black
    }
});

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
    const menuItems = [
        {
            name: 'Подписки',
            //@ts-ignore
            component: <SubscriptionsFeedScreen navigation={navigation} />
        },
        {
            name: 'Избранное',
            component: <SavedHomeScreen />
        }
    ];

    const [currentScreen, setCurrentScreen] = React.useState<
        ReactElement<any, any>
    >(menuItems[0].component);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cheapContainer}>
                <Cheaps
                    cheaps={menuItems}
                    currentScreen={(component) => {
                        setCurrentScreen(component);
                    }}
                />
            </View>
            <View style={styles.mainContainer}>{currentScreen}</View>
        </SafeAreaView>
    );
}
