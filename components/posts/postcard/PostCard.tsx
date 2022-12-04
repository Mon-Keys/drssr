import {
    Image,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Dimensions,
    Pressable
} from 'react-native';
import React, { useRef } from 'react';
import { IPost } from '../../reducers/posts/post';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from '../../../styles';
import IconButton from '../../base/IconButton';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export interface PostCardProps {
    goBackCallback: () => void;
    likeCardCallback: () => void;
    post: IPost;
}

const styles = StyleSheet.create({
    container: {
        height: 260,
        width: 160
    },
    postDescription: {
        backgroundColor: Colors.base.lightgray,
        borderRadius: 26,
        width: '100%',
        height: 336
    },
    itemsContainer: {
        backgroundColor: Colors.base.lightgray,
        borderRadius: 26,
        width: '100%',
        height: 310,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    postDescriptionUpperContainer: {
        height: 35,
        width: 344
    },
    postDescriptionBottomContainer: {
        height: 244,
        width: 344
    },
    image: {
        backgroundColor: Colors.base.lightgray,
        borderRadius: 26,
        width: '100%',
        height: 504
    },
    itemCard: {
        height: 193,
        width: 170,
        backgroundColor: Colors.base.white,
        borderRadius: 14,
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
        <View style={styles.image}>
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

    let [state, setState] = React.useState({
        activeIndex: 0,
        carouselItems: [
            {
                title: 'Item 1',
                text: 'Text 1'
            },
            {
                title: 'Item 2',
                text: 'Text 2'
            },
            {
                title: 'Item 3',
                text: 'Text 3'
            },
            {
                title: 'Item 4',
                text: 'Text 4'
            },
            {
                title: 'Item 5',
                text: 'Text 5'
            }
        ]
    });

    let [state1, setState1] = React.useState({
        activeIndex: 0,
        carouselItems: [
            {
                title: 'Item 1',
                text: 'Text 1'
            },
            {
                title: 'Item 2',
                text: 'Text 2'
            },
            {
                title: 'Item 3',
                text: 'Text 3'
            },
            {
                title: 'Item 4',
                text: 'Text 4'
            },
            {
                title: 'Item 5',
                text: 'Text 5'
            }
        ]
    });

    let carouselRef = useRef<Carousel<any>>();
    let itemsRef = useRef<Carousel<any>>();
    var data;
    if (props.post.previews_paths) {
        data = [...props.post.previews_paths, props.post.look.img_path];
    } else {
        data = [props.post.look.img_path];
    }
    const navigation = useNavigation();

    var clothesData = props.post.look.clothes.map((item) => {
        const onPress = () => {
            navigation.navigate('Item', { id: item.id });
        };
        return {
            ...item,
            onPress
        };
    });

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: Colors.base.black,
                paddingTop: 50
            }}
        >
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
                    sliderWidth={300}
                    itemWidth={Dimensions.get('window').width}
                    renderItem={_renderItem}
                    onSnapToItem={(index) => setActiveIndex(index)}
                />
                <View
                    style={{
                        position: 'absolute',
                        zIndex: 1,
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: 364,
                        top: -10
                    }}
                >
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

                    <Pagination
                        tappableDots={true}
                        carouselRef={carouselRef}
                        dotsLength={data.length}
                        activeDotIndex={activeIndex}
                        containerStyle={{}}
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
                    <IconButton
                        onPress={() => {
                            props.goBackCallback();
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
                                    name="back"
                                    size={18}
                                    color="black"
                                />
                            </View>
                        }
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
    );
};
