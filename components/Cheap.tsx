import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ButtonProps,
    Pressable,
    Animated
} from 'react-native';
import Colors from '../constants/Colors';

interface CheapProps extends ButtonProps {
    isActive: boolean;
}

const styles = StyleSheet.create({
    active: {
        backgroundColor: Colors.base.white,
        width: 144,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inactive: {
        backgroundColor: Colors.base.black,
        width: 144,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inactiveTitle: {
        fontSize: 18,
        fontFamily: 'proxima-nova',
        color: Colors.base.white
    },
    activeTitle: {
        fontSize: 18,
        fontFamily: 'proxima-nova',
        color: Colors.base.black
    }
});

const Cheap = (props: CheapProps) => {
    const fadeAnim = React.useRef(new Animated.Value(1)).current;

    const [animation] = React.useState(new Animated.Value(0));

    // const fadeIn = () => {
    //     // Will change fadeAnim value to 1 in 5 seconds
    //     Animated.timing(fadeAnim, {
    //         toValue: 1,
    //         duration: 500,
    //         useNativeDriver: false
    //     }).start();
    // };

    // const fadeToBlack = (
    //     callback: ((event: GestureResponderEvent) => void) | undefined
    // ) => {
    //     // @ts-ignore
    //     // Animated.timing(animation, {
    //     //     toValue: 1,
    //     //     duration: 400,
    //     //     useNativeDriver: false
    //     // }).start(callback);
    // };

    const fadeToWhite = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 400,
            useNativeDriver: false
        }).start();
    };

    const boxInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.base.black, Colors.base.white]
    });

    const boxInterpolationWhite = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.base.white, Colors.base.black]
    });

    // const fadeOut = () => {
    //     // Will change fadeAnim value to 0 in 3 seconds
    //     Animated.timing(fadeAnim, {
    //         toValue: 0,
    //         duration: 500,
    //         useNativeDriver: false
    //     }).start();
    // };

    fadeToWhite();

    return (
        <SafeAreaView>
            <Animated.View style={{ opacity: fadeAnim }}>
                <Pressable {...props}>
                    <Animated.View
                        style={
                            props.isActive
                                ? {
                                      ...styles.active,
                                      backgroundColor: boxInterpolationWhite
                                  }
                                : {
                                      ...styles.inactive,
                                      backgroundColor: boxInterpolation
                                  }
                        }
                        {...props}
                    >
                        <Animated.Text
                            style={
                                props.isActive
                                    ? {
                                          ...styles.activeTitle,
                                          color: boxInterpolation
                                      }
                                    : {
                                          ...styles.inactiveTitle,
                                          color: boxInterpolationWhite
                                      }
                            }
                        >
                            {' '}
                            {props.title}{' '}
                        </Animated.Text>
                    </Animated.View>
                </Pressable>
            </Animated.View>
            {/*<Pressable onPress={fadeToBlack}  style={{backgroundColor: Colors.base.orange , width: 40,height: 40, borderRadius: 15}}>*/}
            {/*    <Text> to black </Text>*/}
            {/*</Pressable>*/}

            {/*<Pressable onPress={fadeToWhite} style={{backgroundColor: Colors.base.orange , width: 40,height: 40, borderRadius: 15}}>*/}
            {/*    <Text> to white </Text>*/}
            {/*</Pressable>*/}
        </SafeAreaView>
    );
};

export default Cheap;
