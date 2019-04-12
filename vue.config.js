module.exports = {
    devServer: {
        proxy: {
            "/rest": {
                target: "http://localhost:9000",
                secure: false
            }
        }
    }
};
