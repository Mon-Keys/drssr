module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'ci',
                'docs',
                'fix',
                'refact',
                'revert',
                'code'
            ]
        ]
    }
};
