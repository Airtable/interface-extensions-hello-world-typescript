const createBundler = require('@airtable/blocks-webpack-bundler').default;

function createConfig(baseConfig) {
    const cssRule = baseConfig.module.rules.find(
        rule => rule.test && rule.test.toString().includes('css'),
    );
    cssRule.use = [
        'style-loader',
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [require('tailwindcss'), require('autoprefixer')],
                },
            },
        },
    ];
    return baseConfig;
}

exports.default = () => {
    return createBundler(createConfig);
};
