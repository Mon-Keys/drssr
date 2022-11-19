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
        small: Abstracts.base.point,
        micro: Math.round(Abstracts.base.point / 2)
    },
    cornerRadius: Abstracts.base.point * 2,
    fontSize: {
        header: 24,
        big: 18,
        default: 14,
        small: 12,
        micro: 8,
    }
};
