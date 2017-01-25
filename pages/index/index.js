const Waves = require('../../libs/Waves.js')
const app = getApp()
const windowWidth = wx.getSystemInfoSync().windowWidth
const windowHeight = wx.getSystemInfoSync().windowHeight
const canvasHeight = windowHeight / 3 * 2

Page({
  data: {
    canvasHeight: canvasHeight,
    todayData: {
      temperature: 36.7,
      inPeriod: true,
      daysPeriodLasts: 3
    }
  },
  onReady () {
    let wave
    let ctx = wx.createCanvasContext('waveCanvas')
    let grd = ctx.createLinearGradient(0, 0, 0, canvasHeight)
    
    grd.addColorStop(0, '#f9bec3')
    grd.addColorStop(1, '#ee4e5b')
    //grd.addColorStop(0, '#b7ecfe')
    //grd.addColorStop(1, '#56abfe')
    wave = new Waves(ctx, {
        width: windowWidth,
        height: canvasHeight,
        autoStart: true,
        waves: [{
            x: 0,
            y: 70,
            color: grd,
            opacity: .8,
            speed: .3,
            length: windowWidth * 2,
            height: 20
        }, {
            x: 30,
            y: 100,
            color: grd,
            opacity: .8,
            speed: .4,
            length: windowWidth * 2,
            height: 20
        }]
    })

    this.drawActionCanvas()
  },
  drawActionCanvas () {
    let ctx = wx.createCanvasContext('actionCanvas')
    ctx.setFillStyle('white')
    ///ctx.fillRect(0, 0, 80, 30)
    //ctx.setFillStyle('black')
    ctx.setFontSize(20)
    ctx.fillText('EDIT', 19, 24)
    ctx.draw()
  },
  tapCanvas () {
    wx.showModal({
      title: 'tap canvas',
      content: 'tap canvas'
    })
  },
  tapListIcon () {
    wx.navigateTo({url: '../month/month'})
    // wx.navigateTo({url: '../input/input'})
  }
})
