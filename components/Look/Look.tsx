import {Image, TouchableOpacity, StyleSheet, Text, ScrollView} from 'react-native';
import { View } from '../base/Themed';
import React from 'react';
import Colors from '../../styles/Colors';
import {Layout} from "../../styles";
import {ILook} from "../../reducers/lookReducer";
import {getUri} from "../../network/const";
import BaseButton from "../base/BaseButton";
import {useNavigation} from "@react-navigation/native";
import {RootNavigation} from "../../types";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {createPost} from "../../reducers/posts/createPost";
import {ICreatePost} from "../../network/api/common";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'transparent'
    },
    previewContainer: {
        height: 450,
        margin: Layout.margins.default,
        borderRadius: Layout.cornerRadius,
        backgroundColor: 'red'
    },
    lookImage: {
        flex: 1,
        resizeMode: 'cover', // TODO временно пока луки маленькие
        borderRadius: Layout.cornerRadius
    },
    descriptionContainer: {
        backgroundColor: Colors.base.white,
        marginHorizontal: Layout.margins.default,
        borderRadius: Layout.cornerRadius
    },
    lookText: {
        marginVertical: Layout.margins.small,
        marginHorizontal: Layout.margins.default,

        fontFamily: 'proxima-nova',
        fontSize: Layout.fontSize.default
    },
    button: {
        margin: Layout.margins.default,
    },
});

export const Look = ({look} : {look: ILook}) => {
    const navigation = useNavigation<RootNavigation>();

    const dispatch = useAppDispatch();

    const publish = () => {
        const post: ICreatePost = {
            element_id: look.id,
            type: 'look',
            description: 'захардкоженное описание поста',
            previews: [look.img_path],
        }
        dispatch(createPost(post))
        navigation.navigate('Profile');
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }} scrollEnabled={true}>
                <View style={styles.previewContainer}>
                    <Image style={styles.lookImage} source={{ uri: getUri(look.img_path) }}/>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.lookText}>{'look.d escr iptionl ook. descr iptionl ook.dk.d escr iptionl ook. descr iptionl ook.descrlook.d escr iptionl ook. descr iptionl ook.descr iptionlook.de scription ewf look.description'}{look.description}</Text>
                </View>
                <BaseButton title={'Опубликовать'} style={styles.button} onPress={publish} />
            </ScrollView>
        </View>
    );
};
