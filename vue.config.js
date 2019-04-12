module.exports = {
    devServer: {
        proxy: {
            "/rest": {
                target: "http://localhost:9000/rest",
                secure: false
            }
        }
    }
};
