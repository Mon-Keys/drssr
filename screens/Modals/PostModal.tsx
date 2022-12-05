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
        backgroundColor: Colors.base.lightgray
    }
});

export default function PostModalScreen({
    navigation
}: RootStackScreenProps<'Post'>) {
    const route = useRoute<PostRouteProp>();
    const { post } = route.params;

    return (
        <View style={styles.container}>
            <PostCard
                post={post}
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
