module.exports = {
    lintOnSave: false,
    runtimeCompiler: true,
    baseUrl: process.env.NODE_ENV === 'production'
        ? 'http://149.56.185.80:9000/'
        : 'http://localhost:9000/'
}