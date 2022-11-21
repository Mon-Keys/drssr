import React from 'react';
import { RefreshControl } from 'react-native';

import { LookList } from '../../../components/looks/LooksList';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { fetchUsersLooks, selectLook } from '../../../reducers/lookReducer';
import { Colors } from '../../../styles';
import EmptyView from '../../../components/base/EmptyView';

export default function LooksWardrobeScreen() {
    const looks = useAppSelector(selectLook);
    const dispatch = useAppDispatch();

    const [refreshing] = React.useState(false);

    const refresh = () => {
        dispatch(fetchUsersLooks());
    };
    // const flatListRef = React.useRef();
    React.useEffect(() => {
        dispatch(fetchUsersLooks());
    }, [dispatch]);

    // const toTop = () => {
    //     // use current
    //     flatListRef.current.scrollToOffset({ animated: true, offset: 1000 })
    // }
    const isLooks = (): boolean => {
        return looks && looks.LooksData && looks.LooksData.length > 0;
    };

    return (
        <>
            {isLooks() ? (
                <LookList
                    looks={looks.LooksData}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.base.black}
                            refreshing={refreshing}
                            onRefresh={refresh}
                        />
                    }
                />
            ) : (
                <EmptyView
                    textHeader={'Здесь пока пусто'}
                    text={'Создайте образ с помощью +'}
                />
            )}
        </>
    );
}
