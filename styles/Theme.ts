import Colors from './Colors';

const PoseLightTheme = {
    dark: false,
    colors: {
        primary: Colors.base.darkgray,
        background: Colors.base.lightgray,
        card: Colors.base.lightgray,
        text: Colors.base.darkgray,
        border: Colors.base.lightgray,
        notification: Colors.base.red
    }
};

const PoseDarkTheme = {
    dark: true,
    colors: {
        primary: Colors.base.darkgray,
        background: Colors.base.lightgray,
        card: Colors.base.white,
        text: Colors.base.darkgray,
        border: Colors.base.lightgray,
        notification: Colors.base.red
    }
};

export default {
    dark: PoseDarkTheme,
    light: PoseLightTheme
};
