import { Image, StyleSheet } from 'react-native';
import { View } from '../base/Themed';
import React from 'react';
import { Colors, Layout } from '../../styles';
import { getUri } from '../../network/const';
import { IPost } from '../../reducers/posts/post';
import IconButton from '../base/IconButton';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        height: 260,
        width: 160,
        borderRadius: Layout.cornerRadius
    },
    postImage: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: Layout.cornerRadius
    },
    likeButton: {
        width: 28,
        height: 28,
        position: 'absolute',
        bottom: 14,
        right: 14,
        borderRadius: 28,
        backgroundColor: Colors.base.lightgray
    }
});

export const PostPreview = ({ post }: { post: IPost }) => {
    // const navigation = useNavigation<RootNavigation>();

    const getUriPreview = (item: IPost) => {
        let path = '';
        if (item.type === 'look') {
            if (item.look) {
                path = item.look.img_path;
            }
        } else if (item.type === 'clothes') {
            if (item.clothes) {
                path = item.clothes[0].img_path;
            }
        }
        if (item.previews_paths) {
            path = item.previews_paths[0];
        }
        if (path !== '') {
            return getUri(path);
        }
        return '';
    };

    const [isLike, setLike] = React.useState(true);

    return (
        <View style={styles.container}>
            <Image
                style={styles.postImage}
                source={{ uri: getUriPreview(post) }}
            />
            <View style={styles.likeButton}>
                <IconButton
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => {
                        setLike(!isLike);
                    }}
                    icon={
                        <AntDesign
                            name={'hearto'}
                            size={18}
                            color={
                                isLike
                                    ? Colors.base.black
                                    : Colors.base.darkgray
                            }
                        />
                    }
                />
            </View>
        </View>
    );
};
