module.exports = {
    api: {
        output: {
            mode: 'split',
            target: './src/api',
            schemas: './src/api/generated',
            client: 'react-query',
            mock: false,
        },
        input: {
            target: './openapi/swagger.json',
        },
    },
};
