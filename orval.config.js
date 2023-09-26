module.exports = {
    api: {
        input: './openapi/swagger.json',
        output: {
            target: './src/api',
            override: {
                mutator: "./src/api/axios.ts",
            },
        },
    },
};
