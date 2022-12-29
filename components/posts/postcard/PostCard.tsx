import {
    Image,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Dimensions,
    Pressable, Platform, StatusBar
} from 'react-native';
import React, { useRef } from 'react';
import { IPost } from '../../../reducers/posts/post';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ScrollView } from 'react-native-gesture-handler';
import {Colors, Layout} from '../../../styles';
import { useNavigation } from '@react-navigation/native';
import Header from "../../header/header";
import { LikeButton } from "./LikeButton";
import network from "../../../network";
import {getUri} from "../../../network/const";

export interface PostCardProps {
    goBackCallback: () => void;
    likeCardCallback: () => void;
    post: IPost;
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: Layout.margins.small
    },

    imageContainer: {
        backgroundColor: Colors.base.lightgray,
        borderRadius: Layout.cornerRadius,
        flex: 1,
        minHeight: 504
    },
    image: {
        backgroundColor: Colors.base.lightgray,
        borderRadius: Layout.cornerRadius,
        flex: 1,
        // resizeMode: 'contain'
    },

    postDescription: {
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
        marginVertical: 7
    },
    postDescriptionUpperContainer: {
        height: 36,
        margin: Layout.margins.default,
        flexDirection: 'row',
    },
    postDescriptionAuthorContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    postDescriptionAvatar: {
        borderRadius: 50,
        height: 36,
        width: 36
    },
    postDescriptionAuthor: {
        width: 200,
        fontSize: Layout.fontSize.default,
        fontWeight: 'bold',
        marginLeft: Layout.margins.small
    },
    postDescriptionBottomContainer: {
        marginHorizontal: Layout.margins.default,
        marginBottom: Layout.margins.default
    },
    postDescriptionName: {
        maxWidth: 300,
        marginTop: Layout.margins.default,
        marginBottom: Layout.margins.small,
        fontSize: Layout.fontSize.header,
        fontWeight: 'bold'
    },
    postDescriptionDescription: {
        marginVertical: Layout.margins.small,
        fontSize: Layout.fontSize.default,
    },
    postDescriptionLikes: {
        marginVertical: Layout.margins.small,
        fontSize: Layout.fontSize.default,
        fontWeight: 'bold'
    },
    postDescriptionLike: {
        alignItems: 'flex-start',
        marginVertical: Layout.margins.small,
    },

    itemsContainer: {
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
        width: '100%',
        alignItems: 'center',
        padding: 16,
        marginBottom: 14
    },
    itemsHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 19,
        paddingBottom: 16
    },
    itemCard: {
        height: 193,
        width: '100%',
        backgroundColor: Colors.base.lightgray,
        borderRadius: Layout.cornerRadius,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemCardImage: {
        width: 133,
        height: 133,
        resizeMode: 'center'
    },
    itemCardSign: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});

function _renderItem(props) {
    return (
        <View style={styles.imageContainer}>
            <Image
                style={styles.image}
                source={{ uri: getUri(props.item) }}
            />
        </View>
    );
}

function _renderClothesItem(props) {
    return (
        <Pressable onPress={props.item.onPress}>
            <View style={styles.itemCard}>
                <Image
                    style={styles.itemCardImage}
                    source={{
                        uri: getUri(props.item.mask_path)
                    }}
                />
                <Text style={styles.itemCardSign}>{props.item.brand}</Text>
            </View>
        </Pressable>
    );
}

export const PostCard = (props: PostCardProps) => {
    const navigation = useNavigation();

    const [activeIndex, setActiveIndex] = React.useState(0);
    const [activeIndexItems, setActiveIndexItems] = React.useState(0);

    // костыли, из-за которых можно ловить угарные баги
    const [is_liked, setLike] = React.useState(props.post.is_liked);
    const [likes, setLikes] = React.useState(props.post.likes);

    const look = props.post.look;

    const [authorName, setAuthorName] = React.useState<string>('');
    const [authorAvatar, setAuthorAvatar] = React.useState<string>('');
    React.useEffect(() => {
        if (props.post.look.creator_id && authorName == '') {
            network.Common.getUserData(props.post.look.creator_id).then((data) => {
                setAuthorName(data.data.name);
                setAuthorAvatar(getUri(data.data.avatar));
            });
        }
    });

    let carouselRef = useRef<Carousel<any>>();
    let itemsRef = useRef<Carousel<any>>();

    let data: Array<string> = [look.img_path];
    if (props.post.previews_paths) {
        data.unshift(...props.post.previews_paths);
    }

    let clothesData = look.clothes.map((item) => {
        const onPress = () => {
            navigation.navigate('Item', { id: item.id });
        };
        return {
            ...item,
            onPress
        };
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header
                    style={{ marginVertical: 14 }}
                    title={'Просмотр публикации'}
                    back={() => navigation.goBack()}
                />
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                >
                    <Carousel
                        layout={'stack'}
                        ref={(ref) => (carouselRef = ref)}
                        data={data}
                        sliderWidth={250} // TODO пиздец
                        itemWidth={Dimensions.get('window').width-14} // TODO пиздец
                        renderItem={_renderItem}
                        onSnapToItem={(index) => setActiveIndex(index)}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            zIndex: 1,
                            flexDirection: 'row',
                            top: -14
                        }}
                    >
                        <Pagination
                            tappableDots={false}
                            // carouselRef={carouselRef}
                            dotsLength={data.length}
                            activeDotIndex={activeIndex}
                            dotStyle={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: Colors.base.black
                            }}
                            inactiveDotStyle={{
                                width: 8,
                                height: 8,
                                borderRadius: 5,
                                backgroundColor: Colors.base.darkgray
                            }}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                        />
                    </View>
                </View>
                <View style={styles.postDescription}>
                    <View style={styles.postDescriptionUpperContainer}>
                        <View style={styles.postDescriptionAuthorContainer}>
                            <Image
                                style={styles.postDescriptionAvatar}
                                source={{
                                    uri: authorAvatar == ''
                                        ? 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg'
                                        : authorAvatar
                                }}
                            />
                            <Text numberOfLines={1} style={styles.postDescriptionAuthor}>
                                {authorName}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.postDescriptionBottomContainer}>
                        {look.name ? (
                            <Text numberOfLines={1} style={styles.postDescriptionName}>
                                {props.post.name}
                            </Text>
                        ) : null}
                        {look.description ? (
                            <Text style={styles.postDescriptionDescription}>
                                {props.post.description}
                            </Text>
                        ) : null}
                        <Text style={styles.postDescriptionLikes}>
                            {'Нравится: ' + likes}
                        </Text>
                        <LikeButton
                            id={props.post.id}
                            currentLikes={props.post.likes}
                            is_liked={is_liked}
                            style={styles.postDescriptionLike}
                            callback={() => {
                                setLikes(likes + (!is_liked ? 1 : -1))
                                setLike(!is_liked);
                            }}
                        />
                    </View>
                </View>
                <View style={styles.itemsContainer}>
                    <Text style={styles.itemsHeader}>Вещи в этом луке</Text>
                    <Carousel
                        layout={'default'}
                        ref={(ref) => (itemsRef = ref)}
                        data={clothesData}
                        sliderWidth={354}
                        itemWidth={170}
                        renderItem={_renderClothesItem}
                        onSnapToItem={(index) => setActiveIndexItems(index)}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
