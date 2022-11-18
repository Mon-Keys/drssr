import React from 'react';
import { Platform, RefreshControl, StatusBar, StyleSheet } from 'react-native';

import { View } from '../../../components/base/Themed';
import { LookList } from '../../../components/looks/LooksList';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { fetchUsersLooks, selectLook } from '../../../reducers/lookReducer';
import { Colors } from '../../../styles';

const styles = StyleSheet.create({
});

export default function LooksWardrobeScreen() {
    const looks = useAppSelector(selectLook);
    const dispatch = useAppDispatch();

    const [refreshing] = React.useState(false);

    const refresh = () => {
        dispatch(fetchUsersLooks());
    };
    const flatListRef = React.useRef();
    React.useEffect(() => {
        dispatch(fetchUsersLooks());
    }, [dispatch]);

    // const toTop = () => {
    //     // use current
    //     flatListRef.current.scrollToOffset({ animated: true, offset: 1000 })
    // }

    return (
        <LookList
            //@ts-ignore
            ref={flatListRef}
            looks={looks.LooksData}
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
