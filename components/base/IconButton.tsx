import React, {ReactElement} from 'react';
import {View, Pressable, ViewStyle, ImageStyle, GestureResponderEvent} from 'react-native';

interface StyledButtonProps {
    style?: ViewStyle | ImageStyle;
    icon: ReactElement<any, any>;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}

const IconButton = (props: StyledButtonProps) => {
    return (
        <View style={props.style}>
            <Pressable onPress={props.onPress}>
                {props.icon}
            </Pressable>
        </View>
    );
};

export default IconButton;
