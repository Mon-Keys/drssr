import { Image, StyleSheet } from 'react-native';
import { View } from '../base/Themed';
import React from 'react';
import {Colors, Layout} from "../../styles";
import {getUri} from "../../network/const";
import {useNavigation} from "@react-navigation/native";
import {RootNavigation} from "../../types";
import {IPost} from "../../reducers/posts/post";
import IconButton from "../base/IconButton";
import {AntDesign} from "@expo/vector-icons";

const styles = StyleSheet.create({
    container: {
        height: 260,
        width: 160,
        borderRadius: Layout.cornerRadius,
    },
    postImage: {
        flex: 1,
        resizeMode: 'cover', // TODO временно пока луки маленькие
        borderRadius: Layout.cornerRadius,

        backgroundColor: 'red'
    },
    likeButton: {
        // margin: Layout.margins.default,
        width: 24,
        height: 24,
        position: 'absolute',
        bottom: 14,
        right: 14,
        borderRadius: 20,
        backgroundColor: 'green',
    },
});

export const PostPreview = ({post} : {post: IPost}) => {
    const navigation = useNavigation<RootNavigation>();

    const getUriPreview = (item: IPost) => {
        let path = '';
        if (item.type === 'look') {
            if (item.look) {
                path = item.look.img_path;
            }
        } else if (item.type === 'clothes') {
            if (item.clothes) {
                path = item.clothes.img_path;
            }
        }
        if (path != '') {
            return getUri(path);
        }
        return ''
    }

    return (
        <View style={styles.container}>
            <View style={styles.postImage} />
            {/*<Image style={styles.postImage} source={{ uri: getUriPreview(post) }}/>*/}
            <View style={styles.likeButton}>
                <IconButton style={{ flex:1, alignItems: 'center', justifyContent: 'center' }} icon={(
                    <AntDesign name={'hearto'} size={18} color={Colors.base.darkgray} />
                )} />
            </View>
            {/*<BaseButton title={'Опубликовать'} style={styles.likeButton} onPress={publish} />*/}
        </View>
    );
};
