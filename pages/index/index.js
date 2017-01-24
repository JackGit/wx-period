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
    let ctx = wx.createCanvasContext('myCanvas')
    let grd = ctx.createLinearGradient(0, 0, 0, 200)
    
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
  },
  tapMore () {
    wx.navigateTo({url: '../month/month'})
  },
  tapAdd () {
    wx.navigateTo({url: '../edit/edit'})
  },
  tapText () {
    wx.showModal({
      title: '123',
      content: 'taptext'
    })
  }
})
