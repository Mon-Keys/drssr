import React, { ReactElement } from 'react';

import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { View } from '../../components/base/Themed';
import CheapButtons from '../../components/base/CheapButtons';

import SubscriptionsFeedScreen from './SubscriptionsFeedScreen/SubscriptionsFeedScreen';
import SavedHomeScreen from './SavedScreen/SavedScreen';
import { RootTabScreenProps } from '../../types';
import { Colors } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import IconButton from '../../components/base/IconButton';
import SearchBar from '../../components/base/SearchBar';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'transparent'
    },
    cheapInnerContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 354,
        height: 35
    },
    cheapOuterContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 64
    },
    searchIcon: {
        left: 0
    },
    mainContainer: {
        flex: 10,
        backgroundColor: 'transparent'
    }
});

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
    const menuItems = [
        {
            name: 'Лента',
            //@ts-ignore
            component: <SubscriptionsFeedScreen navigation={navigation} />
        }
    ];

    const [currentScreen, setCurrentScreen] = React.useState<
        ReactElement<any, any>
    >(menuItems[0].component);

    const searchbar = <SearchBar />;
    const searchBarRef = React.useRef(searchbar);

    const [menuOpen, setMenuOpen] = React.useState<boolean>(true);
    return (
        <SafeAreaView style={styles.container}>
            {menuOpen ? (
                <View style={styles.cheapOuterContainer}>
                    <View style={styles.cheapInnerContainer}>
                        {/* <IconButton
                            icon={
                                <AntDesign
                                    name="search1"
                                    size={24}
                                    color={Colors.base.black}
                                />
                            }
                            style={styles.searchIcon}
                            //@ts-ignore
                            title={'search'}
                            onPress={() => {
                                setMenuOpen(!menuOpen);
                            }}
                        /> */}
                        <CheapButtons
                            cheaps={menuItems}
                            currentScreen={(component) => {
                                setCurrentScreen(component);
                            }}
                        />
                    </View>
                </View>
            ) : (
                searchBarRef.current
            )}
            <View style={styles.mainContainer}>{currentScreen}</View>
        </SafeAreaView>
    );
}
