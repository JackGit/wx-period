var Wave = require('../../libs/Wave.js')
var app = getApp()

Page({
  onReady () {
    this.drawRect()
  },
  tapMore () {
    wx.navigateTo({url: '../month/month'})
  },
  tapAdd () {
    wx.navigateTo({url: '../edit/edit'})
  },
  drawRect () {
    new Wave('myCanvas')
  }
})
