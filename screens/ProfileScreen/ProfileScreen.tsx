import React, { useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    RefreshControl,
    SafeAreaView,
    Platform,
    StatusBar,
    FlatList
} from 'react-native';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchUserData, selectUser } from '../../reducers/userReducer';
import { RootNavigation } from '../../types';
import Colors from '../../styles/Colors';
import { ProfileCard } from '../../components/base/ProfileCard';
import { useNavigation } from '@react-navigation/native';
import { getPosts } from '../../reducers/posts/createPost';
import { selectPosts } from '../../reducers/posts/postReducer';
import { Layout } from '../../styles';
import { PostPreview } from '../../components/posts/PostPreview';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    userName: {
        fontSize: 18
    },
    userDescription: {
        fontSize: 16,
        color: Colors.base.darkgray
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50
    },

    postsContainer: {
        // margin: Layout.margins.default,
        // backgroundColor: Colors.base.white,
        // borderRadius: Layout.cornerRadius,
        // padding: Layout.margins.small
    },
    postsWrapper: {
        justifyContent: 'space-between',
        marginHorizontal: Layout.margins.default,
        marginVertical: Layout.margins.small
    }
});

export default function ProfileScreen() {
    const [refreshing] = React.useState(false);

    const navigation = useNavigation<RootNavigation>();

    const { userData } = useAppSelector(selectUser);
    const posts = useAppSelector(selectPosts);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserData());
        dispatch(getPosts());
    }, [dispatch]);

    const refresh = () => {
        dispatch(fetchUserData());
        dispatch(getPosts());
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refresh}
                    />
                }
            >
                <ProfileCard
                    avatarSrc={
                        'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg'
                    }
                    name={userData.name}
                    isVerified={userData.stylist || false}
                    subscribersAmount={3500}
                    location={'Москва'}
                    settingsAction={() => {
                        navigation.navigate('Settings');
                    }}
                    shareAction={() => {}}
                    description={
                        'Сотворю твой успех с помощью 100+ огненных образов. Моими капсулами пользуются более 2500 девушек — присоединяйся и ты!'
                    }
                />
                <FlatList
                    style={styles.postsContainer}
                    columnWrapperStyle={styles.postsWrapper}
                    data={posts}
                    numColumns={2}
                    renderItem={({ item }) => <PostPreview post={item} />}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
