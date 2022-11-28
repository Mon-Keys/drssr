import React, { useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    RefreshControl,
    SafeAreaView,
    Platform,
    StatusBar,
    FlatList,
    Pressable,
    Text,
    View
} from 'react-native';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchUserData, selectUser, stylist } from '../../reducers/userReducer';
import { RootNavigation } from '../../types';
import Colors from '../../styles/Colors';
import { ProfileCard } from '../../components/base/ProfileCard';
import { useNavigation } from '@react-navigation/native';
import { getPosts } from '../../reducers/posts/createPost';
import { Layout } from '../../styles';
import { selectPosts } from '../../reducers/posts/postReducer';
import { BecomeStylistCard } from '../../components/base/BecomeStylistCard';
import { PostPreview } from '../../components/posts/PostPreview';
import NewPostBottomMenu from '../../components/profile/NewPostBottomMenu';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { fetchUsersLooks, selectLooks } from '../../reducers/looks/lookReducer';
import { fetchUsersClothes } from '../../reducers/items/fetchClothes';
import { selectUserItems } from '../../reducers/items/clothesReducer';
import BaseButton from '../../components/base/BaseButton';
import { FeedCommon } from '../../components/feed/FeedCommon';

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
        // marginTop: 50,
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

    const clothes = useAppSelector(selectUserItems);
    const hasClothes = (): boolean => {
        return clothes && clothes.length > 0;
    };

    const looks = useAppSelector(selectLooks);
    const hasLooks = (): boolean => {
        return looks && looks.length > 0;
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserData());
        dispatch(getPosts());
        dispatch(fetchUsersClothes());
        dispatch(fetchUsersLooks());
    }, [dispatch]);

    const refresh = () => {
        dispatch(fetchUserData());
        dispatch(getPosts());
    };

    const MenuRef = React.useRef<BottomSheetModal>(null);

    const openMenu = () => {
        if (MenuRef.current) {
            MenuRef.current.present();
        }
    };

    const becomeStyist = () => {
        dispatch(stylist());
    };

    return (
        <NewPostBottomMenu
            modalRef={MenuRef}
            hasClothes={hasClothes()}
            hasLooks={hasLooks()}
        >
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
                        editAction={() => {}}
                        description={
                            'Сотворю твой успех с помощью 100+ огненных луков. Моими капсулами пользуются более 2500 девушек — присоединяйся и ты!'
                        }
                    />
                    {userData.stylist && (
                        <>
                            <BaseButton
                                title={'Опубликовать'}
                                onPress={openMenu}
                                style={{
                                    marginHorizontal: Layout.margins.default,
                                    marginTop: Layout.margins.default
                                }}
                            />
                            <View
                                style={{
                                    width: '100%',
                                    alignItems: 'center'
                                }}
                            >
                                <FeedCommon
                                    navigation={navigation}
                                    feed={{ data: posts, status: 'ready' }}
                                />
                            </View>
                        </>
                    )}
                    {!userData.stylist && (
                        <BecomeStylistCard becomeStylist={becomeStyist} />
                    )}
                </ScrollView>
            </SafeAreaView>
        </NewPostBottomMenu>
    );
}
