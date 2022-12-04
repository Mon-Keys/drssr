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
import IconButton from '../../base/IconButton';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from "../../header/header";

export interface PostCardProps {
    goBackCallback: () => void;
    likeCardCallback: () => void;
    post: IPost;
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: 30,//Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: Layout.margins.small
    },
    postDescription: {
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
        width: '100%',
        marginVertical: 7
    },
    itemsContainer: {
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
        width: '100%',
        alignItems: 'center',
        padding: 16,
        marginBottom: 14
    },
    postDescriptionUpperContainer: {
        height: 35,
        width: '100%',
    },
    postDescriptionBottomContainer: {
        height: 244,
        width: '100%',
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
        resizeMode: 'contain'
    },
    itemCard: {
        height: 193,
        width: '100%',
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemsHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 19,
        paddingBottom: 16
    },
    postDescriptionAvatar: {
        borderRadius: 50,
        height: 36,
        width: 36
    },
    postDescriptionAuthor: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 17,
        paddingLeft: 6
    },
    postDescriptionAuthorContainer: {
        height: 36,
        margin: 14,
        marginBottom: 24,
        width: 153,
        flexDirection: 'row',
        alignItems: 'center'
    },
    postDescriptionName: {
        fontSize: 20,
        lineHeight: 24,
        fontWeight: 'bold'
    },
    postDescriptionContainer: {
        margin: 14,
        marginTop: 24
    },
    postDescriptionPrice: {
        fontSize: 16,
        lineHeight: 19,
        marginVertical: 14
    },
    postDescriptionDescription: {
        fontSize: 16,
        lineHeight: 19
    },
    itemCardImage: {
        // width: 133,
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
                source={{ uri: `http://leonidperl.in/${props.item}` }}
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
                        uri: `http://leonidperl.in/${props.item.mask_path}`
                    }}
                />
                <Text style={styles.itemCardSign}>{props.item.brand}</Text>
            </View>
        </Pressable>
    );
}

export const PostCard = (props: PostCardProps) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [activeIndexItems, setActiveIndexItems] = React.useState(0);

    let carouselRef = useRef<Carousel<any>>();
    let itemsRef = useRef<Carousel<any>>();
    var data;
    if (props.post.previews_paths) {
        data = [...props.post.previews_paths, props.post.look.img_path];
    } else {
        data = [props.post.look.img_path];
    }
    const navigation = useNavigation();

    let clothesData = props.post.look.clothes.map((item) => {
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
                            tappableDots={true}
                            carouselRef={carouselRef}
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
                                    uri: 'https://www.africanoverlandtours.com/wp-content/uploads/2014/04/animal_facts-e1396431549968.jpg'
                                }}
                            />
                            <Text style={styles.postDescriptionAuthor}>
                                {JSON.stringify(props.post)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.postDescriptionBottomContainer}>
                        <View style={styles.postDescriptionContainer}>
                            <Text style={styles.postDescriptionName}>
                                {props.post.name}
                            </Text>
                            <Text style={styles.postDescriptionPrice}>
                                Общая стоимость: 10 500 руб
                            </Text>

                            <Text style={styles.postDescriptionDescription}>
                                {props.post.description}
                            </Text>
                            <IconButton
                                onPress={() => {
                                    props.likeCardCallback();
                                }}
                                icon={
                                    <View
                                        style={{
                                            backgroundColor: Colors.base.white,
                                            borderRadius: 50,
                                            height: 30,
                                            width: 30,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <AntDesign
                                            name="hearto"
                                            size={15}
                                            color="black"
                                        />
                                    </View>
                                }
                            />
                        </View>
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
