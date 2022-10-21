import React from 'react'
import { StyleSheet, Image, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';

import { Text, View } from '../components/Themed';

import { useEffect } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchUserData, selectUser, logoutUser } from '../reducers/userReducer';
import StyledButton from '../components/StyledButton';


export default function ProfileScreen() {

    const [refreshing, setRefreshing] = React.useState(false);

    const { isLoggedIn, status, error, userData } = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log('hello')

        dispatch(fetchUserData())
    }, [dispatch])

    const logout = () => {

        dispatch(logoutUser())
    }

    const refresh = () => {
        console.log('refresh')
        dispatch(fetchUserData())
    }

    return (
        <View style={styles.container}>
            {refreshing ? <ActivityIndicator /> : null}
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }>
                <Text> {JSON.stringify(userData)} </Text>
                <StyledButton title={"logout"} onPress={logout} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red",
        alignContent: "center",
        justifyContent: "center"
    },
    formContainer: {
        alignItems: 'center',
        // backgroundColor: Colors.base.red,
        height: 300,
        alignContent: "space-between",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
