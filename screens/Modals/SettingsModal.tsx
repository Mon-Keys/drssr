import React from 'react';
import { StyleSheet, Text, Platform, StatusBar } from 'react-native';
import { View } from '../../components/base/Themed';
import StyledButton from '../../components/base/StyledButton';
import { logoutUser } from '../../reducers/userReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Colors } from '../../styles';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

        backgroundColor: Colors.base.lightgray
    },
    tempContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }
});

export default function SettingsModalScreen() {
    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(logoutUser());
    };

    return (
        <View style={styles.container}>
            <View style={styles.tempContainer}>
                <Text style={{ color: 'black' }}>aga</Text>
                <StyledButton title={'logout'} onPress={logout} />
            </View>
        </View>
    );
}
