import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import LinkingConfiguration from './LinkingConfiguration';
import { Theme } from '../styles';
import { RootNavigator } from "./RootNavigator";


export default function Navigation({
    colorScheme
}: {
    colorScheme: ColorSchemeName;
}) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? Theme.light : Theme.dark}
        >
            <RootNavigator />
        </NavigationContainer>
    );
}
