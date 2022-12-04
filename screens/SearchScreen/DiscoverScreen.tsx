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
import { fetchFavoritePosts, selectFavoriteFeeds } from '../../reducers/feedReducer';
import {Layout} from "../../styles";
import EmptyView from "../../components/base/EmptyView";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: 30,// Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'transparent'
    },
    headerContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: Layout.fontSize.big,
        fontWeight: 'bold',
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
    }
});

export default function DiscoverScreen({
    navigation
}: RootTabScreenProps<'Search'>) {
    const dispatch = useDispatch<AppDispatch>();
    const favoriteFeed = useAppSelector(selectFavoriteFeeds);
    const [, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(fetchFavoritePosts());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(fetchFavoritePosts());
    }, [dispatch]);

    const hasFavoriteFeed = (): boolean => {
        console.log(favoriteFeed.data.length);
        return favoriteFeed.data && favoriteFeed.data.length != 0
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Избранное</Text>
            </View>
            <View style={styles.mainContainer}>
                {hasFavoriteFeed() ? (
                    <FeedCommon
                        refreshControl={
                            <RefreshControl
                                refreshing={
                                    favoriteFeed.status ==
                                    'pending'
                                }
                                onRefresh={onRefresh}
                            />
                        }
                        navigation={navigation}
                        feed={favoriteFeed}
                    />
                ) : (
                    <EmptyView
                        textHeader={'Здесь пока пусто'}
                        text={'Добавьте вещи с помощью +'}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
