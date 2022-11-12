import { Dimensions } from 'react-native';
import Abstracts from './Abstracts';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
    window: {
        width,
        height
    },
    isSmallDevice: width < 375,
    margins: {
        big: Abstracts.base.point * 3,
        default: Abstracts.base.point * 2,
        small: Abstracts.base.point
    },
    cornerRadius: Abstracts.base.point * 2
};