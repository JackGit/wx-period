module.exports = {
    requestAnimationFrame (callback) {
        return setTimeout(callback, 1000 / 60)
    },
    cancelAnimationFrame (id) {
        clearTimeout(id)
    }
}