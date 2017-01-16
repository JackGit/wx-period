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
    const ctx = wx.createCanvasContext('myCanvas')
    const grd = ctx.createLinearGradient(0, 0, 200, 0)
    grd.addColorStop(0, 'red')
    grd.addColorStop(1, 'white')
    ctx.rect(10, 10, 150, 75)
    ctx.setFillStyle(grd)
    ctx.fill()
    ctx.draw()
  }
})
