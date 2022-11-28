import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, Platform, StatusBar } from 'react-native';
import { View } from '../../components/base/Themed';
import { PostCard } from '../../components/posts/postcard/PostCard';
import { Colors } from '../../styles';
import {
    ClothingByCategoryScreenRouteProp,
    PostRouteProp,
    RootStackScreenProps
} from '../../types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.base.black
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 useless on android simulator or android 10+
    }
});

export default function PostModalScreen({
    navigation
}: RootStackScreenProps<'Post'>) {
    const route = useRoute<PostRouteProp>();
    const { post } = route.params;
    console.log(route.params);

    return (
        <View style={styles.container}>
            <PostCard
                post={route.params}
                goBackCallback={() => {
                    navigation.goBack();
                }}
                likeCardCallback={() => {
                    alert('like');
                }}
            />
        </View>
    );
}
