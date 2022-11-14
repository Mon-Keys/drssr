import { SimpleLineIcons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import React from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    Image,
    KeyboardAvoidingView
} from 'react-native';
import InputField from '../../components/base/InputField';
import StyledButton from '../../components/base/StyledButton';
import { View } from '../../components/base/Themed';

import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCreateLook } from '../../reducers/createLookReducer';
import { Colors } from '../../styles';
// @ts-ignore

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    lookContainer: {
        width: 354,
        height: 442,
        borderRadius: 14,
        resizeMode: 'contain'
    },
    infoContainer: {
        marginTop: 14,
        width: 354,
        height: 176,
        borderRadius: 14,
        resizeMode: 'contain',
        backgroundColor: Colors.base.white,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default function SaveLookModal() {
    const lookSelector = useAppSelector(selectCreateLook);
    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');

    const addLook = () => {
        console.log({ name, description });
    };

    return (
        <KeyboardAvoidingView
            enabled={true}
            behavior={'position'}
            keyboardVerticalOffset={50}
        >
            <View style={styles.container}>
                <View style={styles.lookContainer}>
                    <Image
                        style={styles.lookContainer}
                        source={{
                            uri: `data:image/jpg;base64,${lookSelector.look.img}`
                        }}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <InputField
                        placeholder="Введите название лука"
                        placeholderTextColor={Colors.base.darkgray}
                        value={name}
                        onChangeText={setName}
                        icon={
                            <MaterialIcons
                                name="drive-file-rename-outline"
                                size={24}
                                color="black"
                            />
                        }
                    />
                    <InputField
                        placeholder="Введите описание лука"
                        placeholderTextColor={Colors.base.darkgray}
                        value={description}
                        onChangeText={setDescription}
                        icon={
                            <SimpleLineIcons
                                name="speech"
                                size={24}
                                color="black"
                            />
                        }
                    />
                    <StyledButton title="Добавить" onPress={addLook} />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
