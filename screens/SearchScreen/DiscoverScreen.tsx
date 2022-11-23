import {
    Platform,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    Text
} from 'react-native';
import React from 'react';
import { FeedCommon } from '../../components/feed/FeedCommon';
import { RootTabScreenProps } from '../../types';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
    fetchFavoritePosts,
    fetchSubscribtionPosts,
    selectFeeds
} from '../../reducers/feedReducer';
import { SearchBar } from '../../components/base/SearchBar';
import IconButton from '../../components/base/IconButton';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../../styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'transparent'
    },
    mainContainer: {
        flex: 10,
        alignItems: 'center',
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
        left: 0,
        position: 'absolute'
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 354
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 19
    }
});

export default function DiscoverScreen({
    navigation
}: RootTabScreenProps<'Search'>) {
    const dispatch = useDispatch<AppDispatch>();
    const subscribtionFeedData = useAppSelector(selectFeeds);
    const [, setRefreshing] = React.useState(false);

    const searchbar = <SearchBar />;
    const searchBarRef = React.useRef(searchbar);

    const [menuOpen, setMenuOpen] = React.useState<boolean>(true);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log('1');
        dispatch(fetchFavoritePosts());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(fetchFavoritePosts());
    }, [dispatch]);

    return (
        <SafeAreaView style={styles.container}>
            {menuOpen ? (
                <View style={styles.cheapOuterContainer}>
                    <View style={styles.cheapInnerContainer}>
                        <IconButton
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
                        />
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>Избранное</Text>
                        </View>
                    </View>
                </View>
            ) : (
                searchBarRef.current
            )}
            <View style={styles.mainContainer}>
                <FeedCommon
                    refreshControl={
                        <RefreshControl
                            refreshing={
                                subscribtionFeedData.FavoriteFeed.status ==
                                'pending'
                            }
                            onRefresh={onRefresh}
                        />
                    }
                    navigation={navigation}
                    feed={subscribtionFeedData.FavoriteFeed}
                />
            </View>
        </SafeAreaView>
    );
}
