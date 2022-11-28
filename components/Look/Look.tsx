import { Image, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import { View } from '../base/Themed';
import React from 'react';
import Colors from '../../styles/Colors';
import { Layout } from '../../styles';
import { ILook } from '../../reducers/looks/lookReducer';
import { getUri } from '../../network/const';
import BaseButton from '../base/BaseButton';
import { useNavigation } from '@react-navigation/native';
import { RootNavigation, TapBarNavigation } from '../../types';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectUser } from '../../reducers/userReducer';
import ItemPreview from '../Look/ItemPreview';
import { selectUserItems } from '../../reducers/items/clothesReducer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: '100%',
        backgroundColor: 'transparent'
    },
    previewContainer: {
        height: 450,
        margin: Layout.margins.default,
        borderRadius: Layout.cornerRadius
    },
    lookImage: {
        flex: 1,
        resizeMode: 'center',
        borderRadius: Layout.cornerRadius
    },
    descriptionContainer: {
        backgroundColor: Colors.base.white,
        marginHorizontal: Layout.margins.default,
        borderRadius: Layout.cornerRadius,
        padding: Layout.margins.default
    },
    lookText: {
        marginHorizontal: Layout.margins.default,
        marginBottom: Layout.margins.small,

        color: Colors.base.black,
        fontFamily: 'proxima-nova',
        fontSize: Layout.fontSize.default
    },
    itemsTitle: {
        marginBottom: Layout.margins.small,
        fontSize: Layout.fontSize.default,
        fontWeight: 'bold',
        color: Colors.base.black
    },
    button: {
        margin: Layout.margins.default
    },
    scroll: {
        margin: Layout.margins.default
    }
});

export const Look = ({ look }: { look: ILook }) => {
    const TapBarNavigation = useNavigation<TapBarNavigation>();
    const navigation = useNavigation<RootNavigation>();

    const user = useAppSelector(selectUser);
    const allClothes = useAppSelector(selectUserItems);
    const isStylist = user.userData.stylist;

    const goToCreatePost = () => {
        navigation.navigate('CreatePost', { type: 'look', id: look.id });
    };

    const getClothesInLook = (): Array<Clothes> => {
        const clothesInLook: Array<Clothes> = [];

        if (look.clothes) {
            look.clothes.forEach((item) => {
                const foundItem = allClothes.find((i) => i.id === item.id);
                if (foundItem) {
                    clothesInLook.push(foundItem);
                }
            });
        }

        return clothesInLook;
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }} scrollEnabled={true}>
                <View style={styles.previewContainer}>
                    <Image
                        style={styles.lookImage}
                        source={{ uri: getUri(look.img_path) }}
                    />
                    {look.description ? (
                        <Text style={styles.lookText}>{look.description}</Text>
                    ) : null}
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.itemsTitle}>Вещи в образе</Text>
                    <FlatList
                        data={getClothesInLook()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <ItemPreview
                                clothes={item}
                                onPress={() =>
                                    navigation.navigate('Item', {
                                        id: item.id
                                    })
                                }
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                {isStylist ? (
                    <BaseButton
                        title={'Опубликовать'}
                        style={styles.button}
                        onPress={goToCreatePost}
                    />
                ) : null}
                <BaseButton
                    title={'Редактировать'}
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('EditLook', {
                            look: look
                        });
                    }}
                />
            </ScrollView>
        </View>
    );
};
