var Waves = require('../../libs/Waves.js')
var app = getApp()

Page({
  onReady () {
    let wave
    let ctx = wx.createCanvasContext('myCanvas')
    wx.getSystemInfo({
      success (info) {
        wave = new Waves(ctx, {
          width: info.windowWidth,
          height: 200,
          autoStart: true,
          waves: [{
            x: 0,
            y: 70,
            color: 'yellow',
            opacity: .8,
            speed: .3,
            length: info.windowWidth * 2,
            height: 20
          }, {
              x: 30,
              y: 100,
              color: 'red',
              opacity: .4,
              speed: .3,
              length: info.windowWidth * 2,
              height: 20
          }]
        })
      }
    })
  },
  tapMore () {
    wx.navigateTo({url: '../month/month'})
  },
  tapAdd () {
    wx.navigateTo({url: '../edit/edit'})
  }
})
