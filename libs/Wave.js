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
            baseline: 50
        })
        this.offset += 1
        requestAnimationFrame(this._render.bind(this))
    }

    _drawWave (wave) {
        let context = this.context
        let width = this.options.width
        let height = this.options.height

        context.save()
        context.setFillStyle('red')
        context.beginPath()
        context.moveTo(0 + this.offset, 0)

        for (let i = 0; i < width; i++) {
            context.lineTo(i + this.offset, Math.sin(i / Math.PI / 16) * 10 + wave.baseline)
        }

        context.lineTo(width, height)
        context.lineTo(0, height)
        context.closePath()
        context.fill()
        context.draw()
    }
}

module.exports = Wave