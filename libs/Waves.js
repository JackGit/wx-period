const requestAnimationFrame = function (callback) {
    return setTimeout(callback, 1000 / 60)
}
const cancelAnimationFrame = function (id) {
    clearTimeout(id)
}

class Waves {
    constructor (canvas, options = {}) {
        this.options = {
            width: options.width,
            height: options.height,
            autoStart: typeof options.autoStart === 'boolean' ? options.autoStart : true
        }
        this.context = typeof canvas === 'string' ? wx.createCanvasContext(canvas) : canvas
        this.waves = options.waves || [] // [{x, y, length, height, color, opacity, speed}]
        this.moving = false
        this.seedId = -1
        this._init()
    }

    _init () {
        this._render()
        if (this.options.autoStart) {
            this.start()
        }
    }

    _render () {
        this.waves.forEach(wave => {
            this.moving && this._moveWave(wave)
            this._drawWave(wave)
        })
        this.context.draw()
        this.seedId = requestAnimationFrame(this._render.bind(this))
    }

    _moveWave (wave) {
        wave.x += wave.speed / Waves.SPEED_ADJUST_CONSTANT
    }

    _drawWave (wave) {
        let context = this.context
        let width = this.options.width
        let height = this.options.height
        // y = Asin(Bx + C) + D
        let A = wave.height
        let B = 2 * Math.PI / wave.length
        let C = wave.x
        let D = wave.y

        context.beginPath()
        context.setGlobalAlpha(wave.opacity)
        context.setFillStyle(wave.color)
        context.moveTo(0, height) // start from left bottom corner
        
        // draw the wave line
        for (let i = 0; i < width; i++) {
            context.lineTo(i, A * Math.sin(B * i + C) + D)
        }

        context.lineTo(width, height)   // end with right bottom corner
        context.closePath() // close path will connect end point to start point
        context.fill()
    }
    
    start () {
        this.moving = true
    }

    stop () {
        this.moving = false
    }

    destroy () {
        cancelAnimationFrame(this.seedId)
        this.waves = []
        this.context.clearRect(0, 0, this.options.width, this.options.height)
        this.context.draw()
    }
}

Waves.SPEED_ADJUST_CONSTANT = 10

module.exports = Waves