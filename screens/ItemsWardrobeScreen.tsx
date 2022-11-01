import React from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import StyledButton from '../components/StyledButton';

import { View } from '../components/Themed';
import Colors from '../constants/Colors';
import { useAppSelector } from '../hooks/useAppSelector';
import { Clothes, selectClothes } from '../reducers/clothesReduser';

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    image: { width: 400, height: 400, resizeMode: 'contain' },
    text: {
        color: Colors.base.black
    }
});

const Item = ({ data }: { data: Clothes }) => (
    <View>
        <Image
            style={styles.image}
            source={{
                uri: `data:image/jpg;base64,${data.img}`
            }}
        />
    </View>
);

export default function ItemsWardrobeScreen() {
    const [showSelect, setShowSelect] = React.useState<String>('');
    const { clothesData } = useAppSelector(selectClothes);

    const hodies = Object.values(clothesData).filter(
        (item) => item.type === 'Hoodie' || item.type === 'Sweater'
    );
    const dresses = Object.values(clothesData).filter(
        (item) => item.type === 'Dress'
    );

    return (
        <View>
            {showSelect !== '' && (
                <StyledButton
                    title="Назад"
                    onPress={() => {
                        setShowSelect('');
                    }}
                />
            )}
            {showSelect === '' && (
                <StyledButton
                    title="Худи"
                    onPress={() => {
                        setShowSelect('hoodies');
                    }}
                />
            )}
            {showSelect === '' && (
                <StyledButton
                    title="Платья"
                    onPress={() => {
                        setShowSelect('sneakers');
                    }}
                />
            )}
            {showSelect === 'hoodies' && (
                <ScrollView>
                    <FlatList
                        data={hodies}
                        renderItem={({ item }) => <Item data={item} />}
                        keyExtractor={(item: Clothes) => item.id.toString()}
                    />
                </ScrollView>
            )}
            {showSelect === 'sneakers' && (
                <ScrollView>
                    <FlatList
                        data={dresses}
                        renderItem={({ item }) => <Item data={item} />}
                        keyExtractor={(item: Clothes) => item.id.toString()}
                    />
                </ScrollView>
            )}
        </View>
    );
}
