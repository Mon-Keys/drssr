import React from 'react';
import { RefreshControl } from 'react-native';

import { LookList } from '../../../components/looks/LooksList';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { fetchUsersLooks, selectLook } from '../../../reducers/looks/lookReducer';
import { Colors } from '../../../styles';
import EmptyView from '../../../components/base/EmptyView';
import {useNavigation} from "@react-navigation/native";
import {RootNavigation} from "../../../types";

export default function LooksWardrobeScreen() {
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

    const isLooks = (): boolean => {
        return looks && looks.LooksData && looks.LooksData.length > 0;
    };

    return (
        <>
            {isLooks() ? (
                <LookList
                    looks={looks.LooksData}
                    onPressLookCard={(id) => {
                        navigation.navigate('Look', {
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
            ) : (
                <EmptyView
                    textHeader={'Здесь пока пусто'}
                    text={'Создайте образ с помощью +'}
                />
            )}
        </>
    );
}
