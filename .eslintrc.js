module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'airbnb-typescript',
        'prettier',
        'plugin:import/recommended'
        // 'prettier/@typescript-eslint',
        // 'prettier/react'
    ],
    parserOptions: {
        project: ['./tsconfig.json']
    },
    settings: {
        'import/ignore': [
            'react-native',
            'react-navigation',
            'reduxjs/toolkit',
            'expo-image-picker',
            'react-redux'
        ]
    },
    env: {
        jest: true
    }
};
