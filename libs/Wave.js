const requestAnimationFrame = function (callback) {
    setTimeout(callback, 1000 / 60)
}

class Wave {
    constructor (canvasId, options) {
        let defaultOptions = {
            width: 300,
            height: 225
        }
        this.options = defaultOptions
        this.context = wx.createCanvasContext(canvasId)
        this.waves = [] // [{color, baseline}]
        this.offset = 0

        this._init()
    }

    _init () {
        this._render()
    }

    _render () {
        this._drawWave({
            index: 0,
            baseline: 70,
            color: 'red',
            speed: .4
        })
        this._drawWave({
            index: 1,
            baseline: 100,
            color: 'red',
            speed: .6
        })
        this.offset += 1
        this.context.draw()
        requestAnimationFrame(this._render.bind(this))
    }

    _drawWave (wave) {
        let context = this.context
        let width = this.options.width
        let height = this.options.height

        //context.save()
        context.beginPath()
        context.setGlobalAlpha(.2)
        context.setFillStyle(wave.color)
        
        context.moveTo(0, height) // start from left bottom corner
        
        // draw the wave line
        // y = Asin(Bx + C) + D
        let A = 20
        let B = 2 * Math.PI / (width * 2)
        let C = this.offset / 20 * wave.speed
        let D = wave.baseline
        for (let i = 0; i < width; i++) {
            context.lineTo(i, A * Math.sin(B * i + C) + D)
        }

        context.lineTo(width, height)   // end with right bottom corner
        context.closePath() // close path will connect end point to start point
        context.fill()
        // context.draw(wave.index === 0 ? false : true)
        //context.restore()
    }
}

module.exports = Wave