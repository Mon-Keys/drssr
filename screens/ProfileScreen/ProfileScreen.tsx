import React, { useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    RefreshControl,
    SafeAreaView,
    Platform,
    StatusBar,
    View
} from 'react-native';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
    checkStylist,
    fetchUserData,
    requestStylist,
    selectUser
} from '../../reducers/userReducer';
import { RootNavigation, RootTabScreenProps } from '../../types';
import Colors from '../../styles/Colors';
import { ProfileCard } from '../../components/base/ProfileCard';
import { useNavigation } from '@react-navigation/native';
import { getPosts } from '../../reducers/posts/createPost';
import { Layout } from '../../styles';
import { selectPosts, selectPosts2 } from '../../reducers/posts/postReducer';
import { BecomeStylistCard } from '../../components/base/BecomeStylistCard';
import { PostPreview } from '../../components/posts/PostPreview';
import NewPostBottomMenu from '../../components/profile/NewPostBottomMenu';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { fetchUsersLooks, selectLooks } from '../../reducers/looks/lookReducer';
import { fetchUsersClothes } from '../../reducers/items/fetchClothes';
import { selectUserItems } from '../../reducers/items/clothesReducer';
import BaseButton from '../../components/base/BaseButton';
import { FeedCommon } from '../../components/feed/FeedCommon';
import { RequestStylist } from '../../components/base/RequestStylist';
import { Feed } from '../../reducers/feedReducer';

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

    const user = useAppSelector(selectUser);
    const userData = user.userData;
    const posts = useAppSelector(selectPosts);

    const postsProfile: Feed = {
        data: posts,
        status: ''
    };

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
        dispatch(checkStylist());
        dispatch(fetchUserData());
        dispatch(getPosts());
        dispatch(fetchUsersClothes());
        dispatch(fetchUsersLooks());
    }, [dispatch]);

    const refresh = () => {
        dispatch(checkStylist());
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
        dispatch(requestStylist());
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
                    style={{ paddingHorizontal: Layout.margins.small }}
                >
                    <ProfileCard
                        avatarSrc={userData.avatar}
                        name={userData.name}
                        isVerified={userData.stylist || false}
                        subscribersAmount={3500}
                        settingsAction={() => {
                            navigation.navigate('Settings');
                        }}
                        shareAction={() => {}}
                        editAction={() => {
                            navigation.navigate('EditProfile');
                        }}
                        description={
                            userData.description ? userData.description : ''
                        }
                    />
                    {userData.stylist && (
                        <>
                            <BaseButton
                                title={'Опубликовать'}
                                onPress={openMenu}
                                style={{
                                    marginVertical: Layout.margins.default
                                }}
                            />
                            <FeedCommon
                                navigation={navigation}
                                feed={postsProfile}
                            />
                        </>
                    )}
                    {!userData.stylist && !user.isRequest && (
                        <BecomeStylistCard becomeStylist={becomeStyist} />
                    )}
                    {!userData.stylist && user.isRequest && <RequestStylist />}
                </ScrollView>
            </SafeAreaView>
        </NewPostBottomMenu>
    );
}
