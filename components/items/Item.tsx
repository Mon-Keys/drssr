import React from 'react';
import { StyleSheet, View, Text, Linking, Modal } from 'react-native';

import { Colors, Layout } from '../../styles';
import { Clothes } from '../../reducers/items/clothesReducer';
import BigImage from '../item/BigImage';
import BaseButton from '../base/BaseButton';
import TextButton from '../base/TextButton';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    imageContainer: {
        marginTop: Layout.margins.default,
        marginHorizontal: Layout.margins.default
    },
    descriptionContainer: {
        fontWeight: 'bold',
        marginTop: Layout.margins.small,
        marginHorizontal: Layout.margins.default,
        paddingHorizontal: Layout.margins.small
    },
    buttonContainer: {
        marginTop: Layout.margins.default,
        marginHorizontal: Layout.margins.default
    },
    modalTitle: {
        fontSize: Layout.fontSize.big,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center'
    },
    modalText: {
        fontSize: Layout.fontSize.default,
        marginBottom: 15,
        textAlign: 'center',
        maxWidth: 300
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.31)'
    },
    modalView: {
        backgroundColor: Colors.base.white,
        borderRadius: Layout.cornerRadius,
        padding: Layout.margins.big,
        alignItems: 'center',
        shadowColor: Colors.base.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 7
    }
});

export default function Item({ item }: { item: Clothes }) {
    const getNameScreen = () => {
        let name = '';
        if (item && item.type) {
            name += item.type;
        }
        if (item && item.brand) {
            name += ' ' + item.brand;
        }
        return name == '' ? 'Вещь' : name;
    };

    const hasLink = () => {
        return item.link && item.link != '';
    };

    const [modalVisible, setModalVisible] = React.useState(false);

    const goToStore = () => {
        Linking.openURL(item.link);
    };

    return (
        <View style={styles.container}>
            <BigImage img={item.mask_path} style={styles.imageContainer} />
            <Text style={styles.descriptionContainer}>{getNameScreen()}</Text>
            {hasLink() ? (
                <BaseButton
                    title={'В магазин'}
                    style={styles.buttonContainer}
                    onPress={() => setModalVisible(true)}
                />
            ) : null}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>
                            {'Перейти по ссылке '}
                        </Text>
                        <Text style={styles.modalText}>{item.link}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextButton
                                title={'Да'}
                                style={styles.buttonContainer}
                                onPress={goToStore}
                            />
                            <TextButton
                                title={'Нет'}
                                style={styles.buttonContainer}
                                onPress={() => setModalVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
