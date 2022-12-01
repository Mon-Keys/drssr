import React from 'react';
import { RefreshControl } from 'react-native';

import { LookList } from '../../components/looks/LooksList';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchUsersLooks, selectLook } from '../../reducers/looks/lookReducer';
import { Colors } from '../../styles';
import { useNavigation } from '@react-navigation/native';
import { RootNavigation } from '../../types';

export default function LooksForNewPostModal() {
    const navigation = useNavigation<RootNavigation>();

    const looks = useAppSelector(selectLook);
    const dispatch = useAppDispatch();

    const [refreshing] = React.useState(false);

    const refresh = () => {
        dispatch(fetchUsersLooks());
    };
    React.useEffect(() => {
        dispatch(fetchUsersLooks());
    }, [dispatch]);

    return (
        <LookList
            looks={looks.LooksData}
            onPressLookCard={(id) => {
                navigation.navigate('CreatePost', {
                    // TODO create post with selected look
                    type: 'look',
                    id: id
                });
            }}
            refreshControl={
                <RefreshControl
                    tintColor={Colors.base.black}
                    refreshing={refreshing}
                    onRefresh={refresh}
                />
            }
        />
    );
}
