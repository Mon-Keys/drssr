module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['fix', 'ci', 'refact', 'code']]
    }
};
