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
    selectFavoriteFeeds
} from '../../reducers/feedReducer';
import { Layout } from '../../styles';
import EmptyView from '../../components/base/EmptyView';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: 30, // Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'transparent'
    },
    headerContainer: {
        height: 53, // такой хардкод епта не просто так, чтобы EmptyView на разных экранах одинаково выглядили
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: Layout.fontSize.big,
        fontWeight: 'bold'
    },
    mainContainer: {
        flex: 1,
        marginHorizontal: Layout.margins.small
    }
});

export default function DiscoverScreen({
    navigation
}: RootTabScreenProps<'Search'>) {
    const dispatch = useAppDispatch();
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
        return favoriteFeed.data && favoriteFeed.data.length != 0;
    };

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
                                refreshing={favoriteFeed.status == 'pending'}
                                onRefresh={onRefresh}
                            />
                        }
                        navigation={navigation}
                        feed={favoriteFeed}
                    />
                ) : (
                    <EmptyView
                        textHeader={'Здесь пока пусто'}
                        text={'Лайкайте посты в ленте и они попадут сюда'}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
